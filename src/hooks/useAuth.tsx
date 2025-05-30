
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AuthUser extends User {
  user_type?: 'tenant' | 'admin';
  profile?: any;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userWithProfile = await getUserWithProfile(session.user);
        setUser(userWithProfile);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userWithProfile = await getUserWithProfile(session.user);
          setUser(userWithProfile);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getUserWithProfile = async (user: User): Promise<AuthUser> => {
    // Check if user is admin
    const { data: adminData } = await supabase
      .from('admins')
      .select('*')
      .eq('id', user.id)
      .single();

    if (adminData) {
      return {
        ...user,
        user_type: 'admin',
        profile: adminData
      };
    }

    // Check if user is tenant
    const { data: tenantData } = await supabase
      .from('tenants')
      .select('*')
      .eq('id', user.id)
      .single();

    if (tenantData) {
      return {
        ...user,
        user_type: 'tenant',
        profile: tenantData
      };
    }

    return user;
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Signed in successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userType: 'tenant' | 'admin' = 'tenant') => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType,
          }
        }
      });

      if (error) throw error;

      // Create profile based on user type
      if (data.user) {
        if (userType === 'tenant') {
          await supabase.from('tenants').insert({
            id: data.user.id,
            email,
            full_name: fullName,
          });
        } else {
          await supabase.from('admins').insert({
            id: data.user.id,
            email,
            full_name: fullName,
            role: 'support',
          });
        }
      }

      toast({
        title: "Success",
        description: "Account created successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Signed out successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin: user?.user_type === 'admin',
    isTenant: user?.user_type === 'tenant',
  };
};
