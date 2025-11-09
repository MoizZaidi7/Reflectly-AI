import React, { Suspense, createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import Loading from './components/common/Loading';
import AppLayout from './layouts/AppLayout';
import { createTheme } from './styles/theme';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Journal = React.lazy(() => import('./pages/Journal'));
const Trends = React.lazy(() => import('./pages/Trends'));

// Page Wrapper Component (with AppLayout but no protection)
const PageWrapper = ({ children }) => {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
};

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const theme = createTheme(isDarkMode);

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      <div className={isDarkMode ? 'dark' : ''}>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes - No Layout */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* App Routes - With Layout but No Protection */}
            <Route path="/dashboard" element={
              <PageWrapper>
                <Dashboard />
              </PageWrapper>
            } />
            <Route path="/journal" element={
              <PageWrapper>
                <Journal />
              </PageWrapper>
            } />
            <Route path="/trends" element={
              <PageWrapper>
                <Trends />
              </PageWrapper>
            } />

            {/* Catch all route - redirect to landing */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Toaster for beautiful notifications */}
        <Toaster 
          position="top-right" 
          richColors 
          expand={true}
          closeButton
        />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;