import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token with backend
      const response = await authAPI.verifyToken();
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        toast.success('Welcome back!');
      } else {
        // Token is invalid
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid token
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.login(credentials);
      
      if (response.data && response.data.token) {
        const { token, user } = response.data;
        
        // Store token
        localStorage.setItem('token', token);
        
        // Update state
        setUser(user);
        setIsAuthenticated(true);
        
        toast.success('Login successful!');
        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.signup(userData);
      
      if (response.data && response.data.token) {
        const { token, user } = response.data;
        
        // Store token
        localStorage.setItem('token', token);
        
        // Update state
        setUser(user);
        setIsAuthenticated(true);
        
        toast.success('Account created successfully!');
        return { success: true };
      }
    } catch (error) {
      console.error('Signup error:', error);
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Clear token
    localStorage.removeItem('token');
    
    // Clear state
    setUser(null);
    setIsAuthenticated(false);
    
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};