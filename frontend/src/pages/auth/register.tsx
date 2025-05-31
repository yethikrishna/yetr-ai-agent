import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EyeIcon, EyeSlashIcon, BoltIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../components/ui/Notifications';
import { cn } from '../../utils';

interface PasswordRequirement {
  label: string;
  check: (password: string) => boolean;
}

const passwordRequirements: PasswordRequirement[] = [
  { label: 'At least 8 characters', check: (p) => p.length >= 8 },
  { label: 'Contains uppercase letter', check: (p) => /[A-Z]/.test(p) },
  { label: 'Contains lowercase letter', check: (p) => /[a-z]/.test(p) },
  { label: 'Contains number', check: (p) => /\d/.test(p) },
];

export default function Register() {
  const router = useRouter();
  const { register, isLoading, isAuthenticated, error, clearError } = useAuth();
  const notify = useNotification();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Clear auth errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Username validation
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      errors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Full name validation
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 2) {
      errors.fullName = 'Full name must be at least 2 characters';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else {
      const failedRequirements = passwordRequirements.filter(req => !req.check(formData.password));
      if (failedRequirements.length > 0) {
        errors.password = 'Password does not meet all requirements';
      }
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Terms acceptance
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await register(formData.username, formData.email, formData.password, formData.fullName);
      notify.success('Welcome to YETR!', 'Your account has been created successfully.');
      router.push('/');
    } catch (error: any) {
      notify.error(
        'Registration Failed', 
        error.message || 'Please check your information and try again.'
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getPasswordStrength = () => {
    const metRequirements = passwordRequirements.filter(req => req.check(formData.password));
    return metRequirements.length;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 1) return 'bg-red-500';
    if (strength <= 2) return 'bg-yellow-500';
    if (strength <= 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const passwordStrength = getPasswordStrength();

  return (
    <>
      <Head>
        <title>Create Account - YETR AI Agent</title>
        <meta name="description" content="Create your YETR AI Agent account" />
      </Head>

      <div className="min-h-screen flex">
        {/* Left side - Registration Form */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Logo and title */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl shadow-lg">
                  <BoltIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Join YETR AI Agent and supercharge your workflow
              </p>
            </div>

            {/* Registration form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Full Name field */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={cn(
                      'input',
                      formErrors.fullName && 'input-error'
                    )}
                    placeholder="Enter your full name"
                  />
                  {formErrors.fullName && (
                    <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                      {formErrors.fullName}
                    </p>
                  )}
                </div>
              </div>

              {/* Username field */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                    className={cn(
                      'input',
                      formErrors.username && 'input-error'
                    )}
                    placeholder="Choose a username"
                  />
                  {formErrors.username && (
                    <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                      {formErrors.username}
                    </p>
                  )}
                </div>
              </div>

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      'input',
                      formErrors.email && 'input-error'
                    )}
                    placeholder="Enter your email address"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className={cn(
                      'input pr-10',
                      formErrors.password && 'input-error'
                    )}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={cn(
                            'h-2 rounded-full transition-all duration-300',
                            getPasswordStrengthColor(passwordStrength)
                          )}
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {passwordStrength === 4 ? 'Strong' : 
                         passwordStrength === 3 ? 'Good' : 
                         passwordStrength === 2 ? 'Fair' : 'Weak'}
                      </span>
                    </div>
                    
                    {/* Password requirements */}
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircleIcon 
                            className={cn(
                              'h-4 w-4',
                              req.check(formData.password) 
                                ? 'text-green-500' 
                                : 'text-gray-300'
                            )}
                          />
                          <span 
                            className={cn(
                              'text-xs',
                              req.check(formData.password) 
                                ? 'text-green-600 dark:text-green-400' 
                                : 'text-gray-500'
                            )}
                          >
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {formErrors.password && (
                  <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                    {formErrors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={cn(
                      'input pr-10',
                      formErrors.confirmPassword && 'input-error'
                    )}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {formErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                      {formErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className={cn(
                      'h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded',
                      formErrors.acceptTerms && 'border-error-500'
                    )}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="acceptTerms" className="text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <Link href="/terms" className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                      Privacy Policy
                    </Link>
                  </label>
                  {formErrors.acceptTerms && (
                    <p className="mt-1 text-sm text-error-600 dark:text-error-400">
                      {formErrors.acceptTerms}
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
                  Create Account
                </Button>
              </div>

              {/* Sign in link */}
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400 dark:hover:text-brand-300">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Hero Image/Info */}
        <div className="hidden lg:block relative w-0 flex-1">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-brand-700">
            <div className="absolute inset-0 bg-black opacity-20" />
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
              style={{ backgroundImage: 'url(/images/ai-hero-bg.jpg)' }}
            />
            
            <div className="relative h-full flex flex-col justify-center p-12 text-white">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold mb-6">
                  Join the AI Revolution
                </h1>
                <p className="text-xl mb-8 text-purple-100">
                  Connect with multiple AI tools, automate complex workflows, and boost your productivity with YETR AI Agent.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-purple-100">Seamless multi-tool integration</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-purple-100">Intelligent task automation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-purple-100">Natural language interface</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-purple-100">Enterprise-grade security</span>
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
