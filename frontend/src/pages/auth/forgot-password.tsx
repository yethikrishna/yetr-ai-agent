import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeftIcon, BoltIcon, CheckCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../components/ui/Notifications';
import { cn } from '../../utils';

interface FormStep {
  id: string;
  title: string;
  description: string;
}

const steps: FormStep[] = [
  {
    id: 'email',
    title: 'Reset your password',
    description: 'Enter your email address and we\'ll send you a link to reset your password.'
  },
  {
    id: 'sent',
    title: 'Check your email',
    description: 'We\'ve sent a password reset link to your email address.'
  }
];

export default function ForgotPassword() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const notify = useNotification();
  
  const [currentStep, setCurrentStep] = useState<string>('email');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateEmail = () => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail()) return;

    setIsLoading(true);

    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would call the password reset API
      // await apiService.requestPasswordReset(email);
      
      setCurrentStep('sent');
      notify.success(
        'Reset link sent!', 
        'Check your email for password reset instructions.'
      );
    } catch (error: any) {
      notify.error(
        'Failed to send reset link', 
        error.message || 'Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    
    // Clear email error when user starts typing
    if (formErrors.email) {
      setFormErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      notify.success(
        'Email resent!', 
        'Check your inbox for the new reset link.'
      );
    } catch (error: any) {
      notify.error(
        'Failed to resend email', 
        'Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const currentStepData = steps.find(step => step.id === currentStep) || steps[0];

  return (
    <>
      <Head>
        <title>Reset Password - YETR AI Agent</title>
        <meta name="description" content="Reset your YETR AI Agent account password" />
      </Head>

      <div className="min-h-screen flex">
        {/* Left side - Reset Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Back to login link */}
            <div className="mb-8">
              <Link 
                href="/auth/login" 
                className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to sign in
              </Link>
            </div>

            {/* Logo and title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl shadow-lg">
                  <BoltIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {currentStepData.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {currentStepData.description}
              </p>
            </div>

            {currentStep === 'email' && (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      className={cn(
                        'input pl-10',
                        formErrors.email && 'input-error'
                      )}
                      placeholder="Enter your email address"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Submit button */}
                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Send reset link
                  </Button>
                </div>

                {/* Additional help */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Remember your password?{' '}
                    <Link href="/auth/login" className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                      Sign in instead
                    </Link>
                  </p>
                </div>
              </form>
            )}

            {currentStep === 'sent' && (
              <div className="space-y-6">
                {/* Success message */}
                <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">
                        Reset link sent successfully!
                      </p>
                      <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                        <p>
                          We've sent a password reset link to <strong>{email}</strong>. 
                          Click the link in the email to reset your password.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      What to do next:
                    </h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-start space-x-2">
                        <span className="bg-brand-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">1</span>
                        <span>Check your email inbox (and spam folder)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="bg-brand-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">2</span>
                        <span>Click the "Reset Password" link in the email</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="bg-brand-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">3</span>
                        <span>Create a new strong password</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="bg-brand-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">4</span>
                        <span>Sign in with your new password</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleResendEmail}
                    variant="outline"
                    className="w-full"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    Resend email
                  </Button>
                  
                  <div className="text-center">
                    <Link href="/auth/login" className="text-sm font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                      Back to sign in
                    </Link>
                  </div>
                </div>

                {/* Troubleshooting */}
                <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                    Didn't receive the email?
                  </h4>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <p>• Check your spam or junk mail folder</p>
                    <p>• Make sure you entered the correct email address</p>
                    <p>• Try resending the email</p>
                    <p>• Contact support if you continue having issues</p>
                  </div>
                </div>
              </div>
            )}

            {/* Help section */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Need help? Contact our{' '}
                <a href="mailto:support@yetr.ai" className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                  support team
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Hero Image/Info */}
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-teal-700">
            <div className="absolute inset-0 bg-black opacity-20" />
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{ backgroundImage: 'url(/images/ai-hero-bg.jpg)' }}
            />
            
            <div className="relative h-full flex flex-col justify-center p-12 text-white">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold mb-6">
                  Secure & Simple
                </h1>
                <p className="text-xl mb-8 text-green-100">
                  Your account security is our priority. Reset your password quickly and securely with our streamlined process.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-green-100">Secure email verification</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-green-100">Encrypted password reset</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-green-100">24/7 support available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
