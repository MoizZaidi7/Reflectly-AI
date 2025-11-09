import React, { useState, useEffect } from 'react';
import { journalAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import EmotionChart from '../components/dashboard/EmotionChart';
import StatsCard from '../components/dashboard/StatsCard';
import RecentEntries from '../components/dashboard/RecentEntries';
import Loading from '../components/common/Loading';
import { BookOpen, TrendingUp, Calendar, Heart, BarChart3, Sparkles, Target, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    emotionTrends: [],
    recentEntries: [],
    stats: {
      totalEntries: 0,
      thisWeekEntries: 0,
      mostCommonEmotion: 'neutral',
      streak: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch emotion trends and recent entries in parallel
      const [trendsResponse, entriesResponse] = await Promise.all([
        journalAPI.getEmotionTrends(30),
        journalAPI.getEntries(1, 5)
      ]);

      // Fix response structure handling
      const trends = trendsResponse.data.data?.trends || [];
      const entries = entriesResponse.data.data || [];
      const totalEntries = entriesResponse.data.pagination?.total || entries.length;

      // Calculate stats
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const thisWeekEntries = entries.filter(entry => 
        new Date(entry.date || entry.createdAt) >= oneWeekAgo
      ).length;

      const mostCommonEmotion = trends.length > 0 
        ? trends.reduce((max, current) => max.total > current.total ? max : current).emotion
        : 'neutral';

      setDashboardData({
        emotionTrends: trends,
        recentEntries: entries,
        stats: {
          totalEntries,
          thisWeekEntries,
          mostCommonEmotion,
          streak: calculateStreak(entries)
        }
      });
      
      setError('');
      toast.success('Dashboard updated successfully');
    } catch (error) {
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStreak = (entries) => {
    if (entries.length === 0) return 0;
    
    const today = new Date();
    let streak = 0;
    let checkDate = new Date(today);
    
    // Sort entries by date (newest first)
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
    );
    
    for (let i = 0; i < 30; i++) {
      const dateStr = checkDate.toDateString();
      const hasEntryToday = sortedEntries.some(entry => {
        const entryDate = new Date(entry.date || entry.createdAt);
        return entryDate.toDateString() === dateStr;
      });
      
      if (hasEntryToday) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    const firstName = user?.name?.split(' ')[0] || 'there';
    if (hour < 12) return `Good morning, ${firstName}`;
    if (hour < 17) return `Good afternoon, ${firstName}`;
    return `Good evening, ${firstName}`;
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Every entry is a step towards better mental health 🌱",
      "You're building a wonderful habit of self-reflection ✨",
      "Your journey of self-discovery is inspiring 🚀",
      "Consistent journaling leads to meaningful insights 💡",
      "Taking time for yourself is an act of self-care 💝"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (loading) {
    return <Loading message="Loading your dashboard..." />;
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
                <h1 className="text-3xl md:text-4xl font-bold">
                  {getGreeting()}!
                </h1>
              </div>
              <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
                {getMotivationalMessage()}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/journal"
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="h-5 w-5" />
                  <span>New Entry</span>
                </Link>
                <Link
                  to="/trends"
                  className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-xl font-semibold text-white hover:bg-black/30 transition-all duration-300"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>View Trends</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <div className="flex items-center space-x-3">
            <Target className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-medium text-red-800">Error</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <button 
              onClick={fetchDashboardData}
              className="ml-auto text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Entries"
          value={dashboardData.stats.totalEntries}
          subtitle="All time entries"
          icon={BookOpen}
          color="blue"
          trend="+12% this month"
        />
        <StatsCard
          title="This Week"
          value={dashboardData.stats.thisWeekEntries}
          subtitle="Entries written"
          icon={Calendar}
          color="emerald"
          trend="Keep it up!"
        />
        <StatsCard
          title="Current Streak"
          value={`${dashboardData.stats.streak} days`}
          subtitle="Writing consistently"
          icon={TrendingUp}
          color="violet"
          trend={dashboardData.stats.streak > 7 ? "Amazing!" : "Building momentum"}
        />
        <StatsCard
          title="Mood Today"
          value={dashboardData.stats.mostCommonEmotion}
          subtitle="Most frequent emotion"
          icon={Heart}
          color="rose"
          trend="Track patterns"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Emotion Chart */}
        <div className="xl:col-span-2">
          <EmotionChart 
            data={dashboardData.emotionTrends}
            title="Emotion Journey"
            subtitle="Your emotional patterns over the last 30 days"
          />
        </div>
        
        {/* Recent Entries */}
        <div className="xl:col-span-1">
          <RecentEntries entries={dashboardData.recentEntries} />
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Insights */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 p-8">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 rounded-full bg-amber-200/30"></div>
          <div className="relative">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-amber-900">Quick Insights</h3>
            </div>
            <div className="space-y-3">
              <p className="text-amber-800 font-medium flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                You've been most active on weekends
              </p>
              <p className="text-amber-800 font-medium flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Your mood tends to improve after journaling
              </p>
              <p className="text-amber-800 font-medium flex items-center">
                <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                Consistency is your strongest trait this month
              </p>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 p-8">
          <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-16 w-16 rounded-full bg-green-200/30"></div>
          <div className="relative">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-green-900">Weekly Progress</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">Weekly Goal</span>
                  <span className="text-sm font-medium text-green-800">
                    {dashboardData.stats.thisWeekEntries}/7
                  </span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.min((dashboardData.stats.thisWeekEntries / 7) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-green-700 font-medium">
                {dashboardData.stats.thisWeekEntries >= 7 
                  ? "🎉 Goal achieved! You're doing amazing!" 
                  : `${7 - dashboardData.stats.thisWeekEntries} more entries to reach your weekly goal`
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;