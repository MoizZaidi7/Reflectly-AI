import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  BookText, 
  LineChart, 
  LogOut, 
  Settings, 
  Menu, 
  X,
  Sun,
  Moon,
  Bell,
  Search,
  User,
  ChevronDown,
  Home,
  TrendingUp,
  Calendar,
  Heart,
  Sparkles
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { toast } from 'sonner';

const AppLayout = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
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

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/dashboard',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      icon: BookText, 
      label: 'Journal', 
      path: '/journal',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      icon: LineChart, 
      label: 'Trends', 
      path: '/trends',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
  ];

  const getPageTitle = () => {
    const currentPath = location.pathname;
    const currentNav = navItems.find(item => item.path === currentPath);
    return currentNav?.label || 'AI Health Journal';
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''} flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800`}>
      {/* Sidebar */}
      <aside className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50 text-gray-800 dark:text-gray-200 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col shadow-lg`}>
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Journal
              </span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow mt-6 px-4">
          <div className="space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? `${item.bgColor} ${item.color} shadow-lg scale-105`
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:scale-105'
                  } ${!isSidebarOpen ? 'justify-center' : ''}`
                }
              >
                <div className={`p-2 rounded-lg ${!isSidebarOpen ? '' : 'mr-3'}`}>
                  <item.icon size={20} />
                </div>
                {isSidebarOpen && (
                  <span className="font-medium group-hover:translate-x-1 transition-transform">
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Quick Stats (when sidebar is open) */}
          {isSidebarOpen && (
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                Today's Progress
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Entries</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Streak</span>
                  <span className="text-sm font-bold text-green-600 dark:text-green-400">7 days</span>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <img 
                src={`https://i.pravatar.cc/40?u=${user?.email}`} 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full border-2 border-blue-200 dark:border-blue-700" 
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                  {user?.name || 'User'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <img 
                src={`https://i.pravatar.cc/40?u=${user?.email}`} 
                alt="User Avatar" 
                className="w-10 h-10 rounded-full border-2 border-blue-200 dark:border-blue-700" 
              />
            </div>
          )}
          
          <button 
            onClick={handleLogout} 
            className={`flex items-center w-full mt-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-200 hover:scale-105 ${!isSidebarOpen ? 'justify-center' : ''}`}
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
          <div className="flex justify-between items-center p-6">
            {/* Page Title */}
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getPageTitle()}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white bg-white/50 backdrop-blur-sm"
                />
              </div>

              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <img 
                    src={`https://i.pravatar.cc/32?u=${user?.email}`} 
                    alt="User Avatar" 
                    className="w-8 h-8 rounded-full border-2 border-blue-200 dark:border-blue-700" 
                  />
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;