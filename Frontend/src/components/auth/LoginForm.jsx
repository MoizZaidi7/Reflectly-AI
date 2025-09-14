// src/components/auth/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Shield } from 'lucide-react';
import Loading from '../common/Loading';

const LoginForm = () => {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const from = location.state?.from?.pathname || '/dashboard';

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
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate(from, { replace: true });
    }
  };

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
<div className="relative px-8 py-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
  <div className="absolute inset-0 bg-black/10"></div>
  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
  <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
  
  <div className="relative text-center">
    {/* Logo */}
    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 border border-white/30">
      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-white">
        <img 
          src="/logo.png"  // 👈 replace with your logo filename in public/
          alt="Reflectly AI Logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>

    <h1 className="text-3xl font-bold mb-2">Welcome to Reflectly AI</h1>
    <p className="text-white/90 text-lg">Sign in to continue your Journey!!!</p>
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
                    <h4 className="font-semibold text-red-800">Authentication Error</h4>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
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
                        : 'border-gray-200/50 focus:border-indigo-500'
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
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className={`
                      w-full pl-12 pr-12 py-4 bg-gray-50/50 border-2 rounded-2xl 
                      text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-0 focus:bg-white
                      transition-all duration-300 hover:bg-gray-50
                      ${formErrors.password 
                        ? 'border-red-300 focus:border-red-500 bg-red-50/50' 
                        : 'border-gray-200/50 focus:border-indigo-500'
                      }
                    `}
                    placeholder="Enter your password"
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
                {formErrors.password && (
                  <p className="text-sm text-red-600 font-medium flex items-center space-x-1">
                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                    <span>{formErrors.password}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  group relative w-full flex items-center justify-center space-x-3 
                  py-4 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 
                  text-white font-semibold rounded-2xl shadow-lg
                  hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700
                  focus:outline-none focus:ring-4 focus:ring-indigo-300/50
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
                    <span>Sign In</span>
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
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center space-x-1 group"
              >
                <span>Create one now</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Trusted by thousands of users worldwide</p>
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-medium">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs font-medium">Modern</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span className="text-xs font-medium">Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;