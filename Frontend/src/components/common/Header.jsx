// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut, Bell, Settings, ChevronDown } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/journal', label: 'Journal' },
    { path: '/trends', label: 'Trends' }
  ];

  const isActive = (path) => location.pathname === path;

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50/30 to-purple-50/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
<Link 
  to="/dashboard" 
  className="flex items-center space-x-3 group hover:scale-105 transition-transform duration-200"
>
  {/* Use logo image from public folder */}
  <img 
    src="/logo.png" 
    alt="Reflectly AI Logo" 
    className="w-12 h-12 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
  />
  
  <div className="hidden sm:block">
    <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
      Reflectly AI
    </span>
    <div className="text-xs text-gray-500 font-medium">Mental Wellness Tracker</div>
  </div>
</Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 hover:scale-105'
                  }
                `}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100/70 rounded-xl transition-all duration-200 hover:scale-110">
              <Bell size={20} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
            </button>

            {/* User Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 p-2 pr-4 hover:bg-gray-100/70 rounded-xl transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="text-white font-semibold text-sm">
                    {getInitials(user?.name)}
                  </span>
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-semibold text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">Welcome back!</div>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`text-gray-500 transition-transform duration-200 ${
                    isUserMenuOpen ? 'rotate-180' : ''
                  }`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl overflow-hidden z-50">
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold">
                          {getInitials(user?.name)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{user?.name}</div>
                        <div className="text-sm text-gray-600">{user?.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button className="flex items-center space-x-3 w-full p-3 text-gray-700 hover:bg-gray-100/70 rounded-xl transition-colors">
                      <Settings size={18} />
                      <span className="font-medium">Settings</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full p-3 text-red-600 hover:bg-red-50/70 rounded-xl transition-colors"
                    >
                      <LogOut size={18} />
                      <span className="font-medium">Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 transition-all duration-200 hover:scale-110"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-xl">
            <div className="p-4 space-y-2">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/70'
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile User Section */}
              <div className="pt-4 mt-4 border-t border-gray-200/50">
                <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold">
                      {getInitials(user?.name)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{user?.name}</div>
                    <div className="text-sm text-gray-600">{user?.email}</div>
                  </div>
                </div>
                
                <button className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-100/70 rounded-xl transition-colors mb-2">
                  <Settings size={20} />
                  <span className="font-medium">Settings</span>
                </button>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50/70 rounded-xl transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Sign out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(isUserMenuOpen || isMobileMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;