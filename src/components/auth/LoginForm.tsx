
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Lock, Mail, Home, AlertCircle } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const { signIn, loading, user, isAdmin, isTenant } = useAuth();

  // Handle users with no profile using useEffect instead of during render
  useEffect(() => {
    if (user && !isAdmin && !isTenant) {
      setLoginError('Account setup incomplete. Please contact support.');
    }
  }, [user, isAdmin, isTenant]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setLoginError(null);
    
    if (!email.trim() || !password) {
      setLoginError('Please enter both email and password.');
      return;
    }

    try {
      const result = await signIn(email, password);
      if (result.error) {
        setLoginError(result.error.message);
      }
    } catch (error: any) {
      setLoginError(error.message || 'An unexpected error occurred.');
    }
  };

  // If user is logged in with proper role, redirect
  if (user) {
    if (isAdmin) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (isTenant) {
      return <Navigate to="/tenant/dashboard" replace />;
    }
    // If user exists but no role, stay on page and show error (handled by useEffect)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <Home className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Tenant Login</CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            Access your tenant portal
          </p>
        </CardHeader>
        <CardContent>
          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In to Portal'
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm space-y-2">
            <div>
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
            <div className="pt-2 border-t">
              <Link to="/admin-login" className="text-sm text-muted-foreground hover:text-primary">
                Admin Login →
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
