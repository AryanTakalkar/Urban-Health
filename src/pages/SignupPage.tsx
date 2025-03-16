
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Urban Health Platform</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Create an account to join the health resilience platform
          </p>
        </div>
        <AuthForm defaultTab="signup" />
      </div>
    </div>
  );
};

export default SignupPage;
