
import { useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AuthUser extends User {
  user_type?: 'tenant' | 'admin';
  profile?: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        
        if (session?.user) {
          // Defer profile fetching to avoid blocking auth state
          setTimeout(async () => {
            try {
              const userWithProfile = await getUserWithProfile(session.user);
              setUser(userWithProfile);
            } catch (error) {
              console.error('Error fetching user profile:', error);
              setUser(session.user as AuthUser);
            }
          }, 0);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        getUserWithProfile(session.user).then(setUser).catch((error) => {
          console.error('Error fetching initial user profile:', error);
          setUser(session.user as AuthUser);
        });
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUserWithProfile = async (user: User): Promise<AuthUser> => {
    try {
      // Check if user is admin first (smaller table)
      const { data: adminData, error: adminError } = await supabase
        .from('admins')
        .select('*')
        .eq('id', user.id)
        .single();

      if (adminData && !adminError) {
        return {
          ...user,
          user_type: 'admin',
          profile: adminData
        };
      }

      // Check if user is tenant
      const { data: tenantData, error: tenantError } = await supabase
        .from('tenants')
        .select('*')
        .eq('id', user.id)
        .single();

      if (tenantData && !tenantError) {
        return {
          ...user,
          user_type: 'tenant',
          profile: tenantData
        };
      }

      // If no profile found, return basic user
      console.warn('No profile found for user:', user.id);
      return user as AuthUser;
    } catch (error) {
      console.error('Error in getUserWithProfile:', error);
      return user as AuthUser;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        let errorMessage = error.message;
        
        // Provide user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before logging in.';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many login attempts. Please wait a moment and try again.';
        }
        
        throw new Error(errorMessage);
      }

      toast({
        title: "Success",
        description: "Signed in successfully!",
      });

      return { data, error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred during sign in.';
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { data: null, error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'tenant' | 'admin' = 'tenant') => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            user_type: userType,
          }
        }
      });

      if (error) {
        let errorMessage = error.message;
        
        if (error.message.includes('User already registered')) {
          errorMessage = 'An account with this email already exists. Please try logging in instead.';
        } else if (error.message.includes('Password should be')) {
          errorMessage = 'Password must be at least 6 characters long.';
        } else if (error.message.includes('Unable to validate email')) {
          errorMessage = 'Please enter a valid email address.';
        }
        
        throw new Error(errorMessage);
      }

      // Create profile based on user type
      if (data.user && !data.user.identities?.length) {
        // User already exists but email not confirmed
        toast({
          title: "Account Already Exists",
          description: "Please check your email for a confirmation link, or try logging in if you've already confirmed your account.",
          variant: "destructive",
        });
        return { data, error: null };
      }

      if (data.user) {
        try {
          if (userType === 'tenant') {
            const { error: profileError } = await supabase.from('tenants').insert({
              id: data.user.id,
              email: email.trim(),
              full_name: fullName,
            });
            
            if (profileError) {
              console.error('Error creating tenant profile:', profileError);
            }
          } else {
            const { error: profileError } = await supabase.from('admins').insert({
              id: data.user.id,
              email: email.trim(),
              full_name: fullName,
              role: 'support',
            });
            
            if (profileError) {
              console.error('Error creating admin profile:', profileError);
            }
          }
        } catch (profileError) {
          console.error('Error creating user profile:', profileError);
        }
      }

      toast({
        title: "Success",
        description: data.user?.email_confirmed_at 
          ? "Account created successfully!" 
          : "Account created! Please check your email to confirm your account before logging in.",
      });

      return { data, error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'An unexpected error occurred during sign up.';
      toast({
        title: "Sign Up Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { data: null, error: { message: errorMessage } };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear state immediately
      setUser(null);
      setSession(null);
      
      toast({
        title: "Success",
        description: "Signed out successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || 'An error occurred during sign out.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin: user?.user_type === 'admin',
    isTenant: user?.user_type === 'tenant',
  };
};
