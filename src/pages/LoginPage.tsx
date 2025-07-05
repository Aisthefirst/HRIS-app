import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
// import logo from '.../assets/otb-icon.png';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center">
            {/* <Building2 className="h-12 w-12 text-primary-600" /> */}
            {/* <img src={logo} alt="logo" /> */}
            <img src='/assets/otb-icon.png' width={150} height={150} alt="logo" />
          </div>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900">
            Sign in to HRIS
          </h2>
          <p className="mt-2 text-sm text-neutral-600">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <Card className="max-w-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              icon={<Mail className="h-4 w-4 text-neutral-400" />}
              placeholder="Enter your email"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<Lock className="h-4 w-4 text-neutral-400" />}
              placeholder="Enter your password"
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>

            <div className="text-center">
              <p className="text-sm text-neutral-600">
                Demo credentials: Use any email and password
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};