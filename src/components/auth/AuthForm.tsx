
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface AuthFormProps {
  defaultTab?: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ defaultTab = 'login' }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  
  const { login, signup } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      toast({
        title: "Logged In Successfully",
        description: "Welcome back to Urban Health Platform!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signup(signupEmail, signupPassword, signupName);
      toast({
        title: "Account Created",
        description: "Welcome to the Urban Health Platform!",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "There was an error creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 w-full max-w-md mx-auto">
      <Tabs 
        defaultValue={activeTab} 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 rounded-none">
          <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 rounded-none">
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="data-[state=active]:bg-white data-[state=active]:dark:bg-gray-900 rounded-none">
            Sign Up
          </TabsTrigger>
        </TabsList>
        
        {/* Login Tab */}
        <TabsContent value="login" className="p-0">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle className="text-xl">Welcome Back</CardTitle>
              <CardDescription>
                Login to access the Urban Health Resilience Platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
                <div className="text-sm text-right">
                  <a href="#" className="text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                className="w-full"
                type="submit"
                disabled={isLoading || !loginEmail || !loginPassword}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setActiveTab('signup')}
                >
                  Sign up
                </button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>
        
        {/* Signup Tab */}
        <TabsContent value="signup" className="p-0">
          <form onSubmit={handleSignup}>
            <CardHeader>
              <CardTitle className="text-xl">Create an Account</CardTitle>
              <CardDescription>
                Join the Urban Health Resilience Platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Full Name"
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                className="w-full"
                type="submit"
                disabled={isLoading || !signupName || !signupEmail || !signupPassword}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
