// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { journalAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import EmotionChart from '../components/dashboard/EmotionChart';
import StatsCard from '../components/dashboard/StatsCard';
import RecentEntries from '../components/dashboard/RecentEntries';
import Loading from '../components/common/Loading';
import { BookOpen, TrendingUp, Calendar, Heart, BarChart3, Sparkles, Target } from 'lucide-react';

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

      const trends = trendsResponse.data.data;
      const entries = entriesResponse.data.data;
      const totalEntries = entriesResponse.data.pagination.total;

      // Calculate stats
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const thisWeekEntries = entries.filter(entry => 
        new Date(entry.date) >= oneWeekAgo
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
    } catch (error) {
      setError('Failed to load dashboard data');
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
    const sortedEntries = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    for (let i = 0; i < 30; i++) { // Check last 30 days max
      const dateStr = checkDate.toDateString();
      const hasEntryToday = sortedEntries.some(entry => 
        new Date(entry.date).toDateString() === dateStr
      );
      
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
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Every entry is a step towards better mental health",
      "You're building a wonderful habit of self-reflection",
      "Your journey of self-discovery is inspiring",
      "Consistent journaling leads to meaningful insights"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loading fullScreen />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <Sparkles className="h-8 w-8 text-yellow-300" />
                <h1 className="text-4xl font-bold">
                  {getGreeting()}, {user?.name}!
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                {getMotivationalMessage()}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/journal"
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Start Writing</span>
                </a>
                <a
                  href="/trends"
                  className="inline-flex items-center space-x-2 bg-black/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-xl font-semibold text-white hover:bg-black/30 transition-all duration-300"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>View Analytics</span>
                </a>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-8 relative rounded-2xl bg-red-50 border border-red-200/50 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl"></div>
              <div className="relative flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Target className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">Something went wrong</h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
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
            {/* Emotion Chart - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <EmotionChart 
                data={dashboardData.emotionTrends}
                title="Emotion Journey"
                subtitle="Your emotional patterns over the last 30 days"
              />
            </div>
            
            {/* Recent Entries - Takes 1 column */}
            <div className="xl:col-span-1">
              <RecentEntries entries={dashboardData.recentEntries} />
            </div>
          </div>

          {/* Insights Section */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Insights Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 p-8">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 rounded-full bg-amber-200/30"></div>
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-900">Quick Insights</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-amber-800 font-medium">
                    • You've been most active on weekends
                  </p>
                  <p className="text-amber-800 font-medium">
                    • Your mood tends to improve after journaling
                  </p>
                  <p className="text-amber-800 font-medium">
                    • Consistency is your strongest trait this month
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 p-8">
              <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-16 w-16 rounded-full bg-green-200/30"></div>
              <div className="relative">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-900">Your Progress</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">Weekly Goal</span>
                      <span className="text-sm font-medium text-green-800">
                        {dashboardData.stats.thisWeekEntries}/7
                      </span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((dashboardData.stats.thisWeekEntries / 7) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-green-700">
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
      </div>
    </>
  );
};

export default Dashboard;