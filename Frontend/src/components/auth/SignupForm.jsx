// src/components/auth/SignupForm.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Shield, Check } from 'lucide-react';
import Loading from '../common/Loading';

const SignupForm = () => {
  const { signup, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    clearError();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await signup(formData.name.trim(), formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    let criteria = [];

    if (password.length >= 6) {
      strength++;
      criteria.push('At least 6 characters');
    }
    if (/[A-Z]/.test(password)) {
      strength++;
      criteria.push('Uppercase letter');
    }
    if (/[a-z]/.test(password)) {
      strength++;
      criteria.push('Lowercase letter');
    }
    if (/\d/.test(password)) {
      strength++;
      criteria.push('Number');
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      strength++;
      criteria.push('Special character');
    }

    return { strength, criteria };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-md w-full">
        {/* Main Form Container */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Header Section */}
          <div className="relative px-8 py-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-teal-600 font-bold text-xl">MJ</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">Join MindJournal</h1>
              <p className="text-white/90 text-lg">Start your wellness journey today</p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            {error && (
              <div className="mb-6 relative rounded-2xl bg-red-50 border border-red-200/50 p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl"></div>
                <div className="relative flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800">Registration Error</h4>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={`
                      w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 rounded-2xl 
                      text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-0 focus:bg-white
                      transition-all duration-300 hover:bg-gray-50
                      ${formErrors.name 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : 'border-gray-200/50 focus:border-teal-500'
                      }
                    `}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-sm text-red-600 font-medium flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{formErrors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={`
                      w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 rounded-2xl 
                      text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-0 focus:bg-white
                      transition-all duration-300 hover:bg-gray-50
                      ${formErrors.email 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : 'border-gray-200/50 focus:border-teal-500'
                      }
                    `}
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-sm text-red-600 font-medium flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className={`
                      w-full pl-12 pr-12 py-4 bg-gray-50/50 border-2 rounded-2xl 
                      text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-0 focus:bg-white
                      transition-all duration-300 hover:bg-gray-50
                      ${formErrors.password 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : 'border-gray-200/50 focus:border-teal-500'
                      }
                    `}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 hover:scale-110 transition-transform"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-2 flex-1 rounded-full transition-colors ${
                            passwordStrength.strength >= level
                              ? passwordStrength.strength <= 2
                                ? 'bg-red-400'
                                : passwordStrength.strength <= 4
                                ? 'bg-yellow-400'
                                : 'bg-green-400'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">
                      Password strength: {' '}
                      <span className={`font-medium ${
                        passwordStrength.strength <= 2 ? 'text-red-600' :
                        passwordStrength.strength <= 4 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {passwordStrength.strength <= 2 ? 'Weak' :
                         passwordStrength.strength <= 4 ? 'Good' : 'Strong'}
                      </span>
                    </p>
                  </div>
                )}
                
                {formErrors.password && (
                  <p className="text-sm text-red-600 font-medium flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{formErrors.password}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-teal-500 transition-colors" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    className={`
                      w-full pl-12 pr-12 py-4 bg-gray-50/50 border-2 rounded-2xl 
                      text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-0 focus:bg-white
                      transition-all duration-300 hover:bg-gray-50
                      ${formErrors.confirmPassword 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'border-green-300 focus:border-green-500 bg-green-50/50'
                        : 'border-gray-200/50 focus:border-teal-500'
                      }
                    `}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 hover:scale-110 transition-transform"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <div className="absolute inset-y-0 right-12 flex items-center">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-sm text-red-600 font-medium flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{formErrors.confirmPassword}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group relative w-full flex items-center justify-center space-x-3 
                  py-4 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 
                  text-white font-semibold rounded-2xl shadow-lg
                  hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700
                  focus:outline-none focus:ring-4 focus:ring-teal-300/50
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transform hover:scale-105 transition-all duration-300
                  hover:shadow-2xl disabled:hover:scale-100
                "
              >
                {loading ? (
                  <Loading size="sm" />
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span>Create Account</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>

          {/* Footer Section */}
          <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-200/50">
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-teal-600 hover:text-teal-700 transition-colors inline-flex items-center space-x-1 group"
              >
                <span>Sign in here</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Smart Insights</h4>
            <p className="text-xs text-gray-600">AI-powered emotion tracking</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Private & Secure</h4>
            <p className="text-xs text-gray-600">Your data stays protected</p>
          </div>
          
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/50">
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Personalized</h4>
            <p className="text-xs text-gray-600">Tailored to your journey</p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Join thousands on their wellness journey</p>
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-medium">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4" />
              <span className="text-xs font-medium">HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;