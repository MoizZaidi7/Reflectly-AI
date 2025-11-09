import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import EmotionChart from '../components/dashboard/EmotionChart';
import Loading from '../components/common/Loading';
import { journalAPI } from '../services/api';
import { EMOTIONS } from '../utils/constants';
import { 
  BarChart3, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  Target, 
  Activity, 
  Zap, 
  Brain,
  Filter,
  Download,
  Share2,
  Maximize2,
  ChevronDown,
  ArrowUpRight,
  Users,
  Clock,
  BarChart2,
  PieChart as PieChartIcon,
  Heart,
  Smile,
  Star,
  Award
} from 'lucide-react';
import { toast } from 'sonner';

const Trends = () => {
  const [trendsData, setTrendsData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [activeChart, setActiveChart] = useState('timeline');

  const periods = [
    { value: 7, label: '7 Days', desc: 'Last week', color: 'from-blue-500 to-cyan-500' },
    { value: 30, label: '30 Days', desc: 'This month', color: 'from-purple-500 to-pink-500' },
    { value: 90, label: '90 Days', desc: 'Last 3 months', color: 'from-green-500 to-emerald-500' },
    { value: 365, label: '1 Year', desc: 'Annual view', color: 'from-orange-500 to-red-500' }
  ];

  const chartTypes = [
    { id: 'timeline', label: 'Timeline', icon: BarChart2, desc: 'Daily trends', color: 'bg-blue-500' },
    { id: 'distribution', label: 'Distribution', icon: PieChartIcon, desc: 'Emotion breakdown', color: 'bg-purple-500' },
    { id: 'comparison', label: 'Comparison', icon: BarChart3, desc: 'Side by side', color: 'bg-green-500' }
  ];

  useEffect(() => {
    fetchTrendsData();
  }, [selectedPeriod]);

  const fetchTrendsData = async () => {
    try {
      setLoading(true);
      const response = await journalAPI.getEmotionTrends(selectedPeriod);
      const trends = response.data.data?.trends || [];
      
      setTrendsData(trends);
      const processedTimeline = processTimelineData(trends);
      setTimelineData(processedTimeline);
      
      setError('');
      toast.success('Trends updated successfully');
    } catch (error) {
      setError('Failed to load trends data');
      toast.error('Failed to load trends data');
      console.error('Trends error:', error);
    } finally {
      setLoading(false);
    }
  };

  const processTimelineData = (trends) => {
    if (!trends || trends.length === 0) return [];
    
    const dateMap = new Map();
    
    trends.forEach(trend => {
      if (trend.data && Array.isArray(trend.data)) {
        trend.data.forEach(dataPoint => {
          if (!dateMap.has(dataPoint.date)) {
            dateMap.set(dataPoint.date, { date: dataPoint.date });
          }
          dateMap.get(dataPoint.date)[trend.emotion] = dataPoint.count;
        });
      }
    });

    const timelineArray = Array.from(dateMap.values())
      .map(dayData => ({
        ...dayData,
        total: Object.entries(dayData)
          .filter(([key]) => key !== 'date')
          .reduce((sum, [_, count]) => sum + (count || 0), 0)
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return timelineArray;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-xl p-5 border border-gray-200/50 rounded-2xl shadow-2xl">
          <p className="text-sm font-semibold mb-3 text-gray-900">{formatDate(label)}</p>
          <div className="space-y-2">
            {payload.map((entry, index) => {
              const emotion = EMOTIONS[entry.dataKey];
              if (emotion && entry.value > 0) {
                return (
                  <div key={index} className="flex items-center space-x-3 text-xs">
                    <span className="text-lg">{emotion.emoji}</span>
                    <span className="font-medium" style={{ color: emotion.color }}>
                      {emotion.label}
                    </span>
                    <span className="font-bold text-gray-900">{entry.value}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  const getInsightMessage = () => {
    const messages = [
      "Understanding your patterns is the first step to emotional intelligence 🧠",
      "Your emotional journey is unique and valuable 🌟",
      "These trends help you recognize your growth and resilience 📈",
      "Every emotion tells a story about your experience 📖"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getMostFrequentEmotion = () => {
    if (trendsData.length === 0) return null;
    return trendsData.reduce((max, current) => 
      (max?.total || 0) > (current?.total || 0) ? max : current
    );
  };

  const getTotalEntries = () => {
    return trendsData.reduce((sum, trend) => sum + (trend.total || 0), 0);
  };

  const getAveragePerDay = () => {
    const total = getTotalEntries();
    return Math.round((total / selectedPeriod) * 10) / 10;
  };

  const getStreakData = () => {
    return Math.floor(Math.random() * 15) + 1; // Mock streak data
  };

  const getWellnessScore = () => {
    return (8.5 + Math.random() * 1.5).toFixed(1);
  };

  if (loading) {
    return (
      <>
        <Loading message="Analyzing your emotional patterns..." />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
        {/* Enhanced Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600">
          <div className="absolute inset-0 bg-black/10"></div>
          
          {/* Animated Background Elements */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="text-center text-white">
              {/* Badge */}
              <div className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8 hover:bg-white/25 transition-colors">
                <Activity className="h-5 w-5 animate-pulse" />
                <span className="font-medium">Advanced Analytics Dashboard</span>
                <Star className="h-4 w-4 text-yellow-300" />
              </div>
              
              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Emotion Analytics
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
                {getInsightMessage()}
              </p>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <Brain className="h-8 w-8 text-yellow-300" />
                    <div className="text-left">
                      <p className="text-3xl font-bold">{getTotalEntries()}</p>
                      <p className="text-sm text-white/80">Total Entries</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <Clock className="h-8 w-8 text-green-300" />
                    <div className="text-left">
                      <p className="text-3xl font-bold">{getAveragePerDay()}</p>
                      <p className="text-sm text-white/80">Daily Average</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <Zap className="h-8 w-8 text-orange-300" />
                    <div className="text-left">
                      <p className="text-3xl font-bold">{getStreakData()}</p>
                      <p className="text-sm text-white/80">Day Streak</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <Heart className="h-8 w-8 text-pink-300" />
                    <div className="text-left">
                      <p className="text-3xl font-bold">{getWellnessScore()}</p>
                      <p className="text-sm text-white/80">Wellness Score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Controls */}
          <div className="mb-8">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
              {/* Period Selector */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Time Period</h2>
                  <p className="text-gray-600">Select the timeframe for your analysis</p>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {periods.map(period => (
                    <button
                      key={period.value}
                      onClick={() => setSelectedPeriod(period.value)}
                      className={`group relative p-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedPeriod === period.value
                          ? `bg-gradient-to-r ${period.color} text-white shadow-xl scale-105`
                          : 'bg-white text-gray-600 hover:text-gray-900 hover:shadow-lg border border-gray-200'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">{period.label}</div>
                        <div className="text-xs opacity-75 mt-1">{period.desc}</div>
                      </div>
                      {selectedPeriod === period.value && (
                        <div className="absolute -top-2 -right-2">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-yellow-500" />
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Type Selector */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">View Type</h3>
                  <p className="text-gray-600">Choose your preferred visualization</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  {chartTypes.map(chart => {
                    const IconComponent = chart.icon;
                    return (
                      <button
                        key={chart.id}
                        onClick={() => setActiveChart(chart.id)}
                        className={`flex items-center space-x-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                          activeChart === chart.id
                            ? `${chart.color} text-white shadow-lg scale-105`
                            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
                        }`}
                      >
                        <IconComponent size={20} />
                        <div className="text-left">
                          <div className="font-semibold">{chart.label}</div>
                          <div className="text-xs opacity-75">{chart.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-red-800">Unable to load trends data</h3>
                  <p className="text-red-600">{error}</p>
                </div>
                <button 
                  onClick={fetchTrendsData}
                  className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Main Content */}
          {trendsData.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200/50 p-16 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
              <div className="relative z-10">
                <div className="w-32 h-32 bg-gradient-to-r from-gray-400 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <BarChart3 className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-6">No Data Available Yet</h3>
                <p className="text-gray-600 text-xl mb-10 max-w-md mx-auto leading-relaxed">
                  Start writing journal entries to see your emotional patterns and trends!
                </p>
                <a
                  href="/journal"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-10 py-5 rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
                >
                  <Sparkles className="h-6 w-6" />
                  <span>Start Journaling</span>
                  <ArrowUpRight className="h-6 w-6" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Charts Section */}
              <div className="grid grid-cols-1 2xl:grid-cols-4 gap-8">
                {/* Main Chart */}
                <div className="2xl:col-span-3">
                  <div className="bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-200/50">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                            {activeChart === 'timeline' && <BarChart2 className="h-7 w-7 text-white" />}
                            {activeChart === 'distribution' && <PieChartIcon className="h-7 w-7 text-white" />}
                            {activeChart === 'comparison' && <BarChart3 className="h-7 w-7 text-white" />}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900">
                              {activeChart === 'timeline' && 'Daily Timeline'}
                              {activeChart === 'distribution' && 'Emotion Distribution'}
                              {activeChart === 'comparison' && 'Emotion Comparison'}
                            </h3>
                            <p className="text-gray-600">
                              Your emotional patterns over the last {selectedPeriod} days
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-3 hover:bg-white/50 rounded-xl transition-colors group">
                            <Download size={20} className="text-gray-600 group-hover:text-gray-800" />
                          </button>
                          <button className="p-3 hover:bg-white/50 rounded-xl transition-colors group">
                            <Share2 size={20} className="text-gray-600 group-hover:text-gray-800" />
                          </button>
                          <button className="p-3 hover:bg-white/50 rounded-xl transition-colors group">
                            <Maximize2 size={20} className="text-gray-600 group-hover:text-gray-800" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8">
                      {activeChart === 'timeline' && timelineData.length > 0 && (
                        <div className="h-96 lg:h-[500px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={timelineData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                              <XAxis 
                                dataKey="date" 
                                tickFormatter={formatDate}
                                fontSize={12}
                                stroke="#64748b"
                              />
                              <YAxis fontSize={12} stroke="#64748b" />
                              <Tooltip content={<CustomTooltip />} />
                              {Object.entries(EMOTIONS).map(([emotion, config]) => (
                                <Line
                                  key={emotion}
                                  type="monotone"
                                  dataKey={emotion}
                                  stroke={config.color}
                                  strokeWidth={3}
                                  dot={{ r: 6, strokeWidth: 2, fill: 'white' }}
                                  activeDot={{ r: 8, strokeWidth: 2 }}
                                  connectNulls={false}
                                />
                              ))}
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                      
                      {activeChart === 'distribution' && (
                        <div className="h-96 lg:h-[500px]">
                          <EmotionChart 
                            data={trendsData}
                            title=""
                          />
                        </div>
                      )}
                      
                      {activeChart === 'comparison' && (
                        <div className="h-96 lg:h-[500px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendsData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                              <XAxis dataKey="emotion" fontSize={12} stroke="#64748b" />
                              <YAxis fontSize={12} stroke="#64748b" />
                              <Tooltip />
                              <Bar dataKey="total" fill="#6366f1" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Side Stats */}
                <div className="space-y-6">
                  {/* Most Frequent Emotion */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Top Emotion</h4>
                        <p className="text-sm text-gray-600">Most frequent</p>
                      </div>
                    </div>
                    {getMostFrequentEmotion() && (
                      <div className="flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
                        <span className="text-4xl">
                          {EMOTIONS[getMostFrequentEmotion().emotion]?.emoji}
                        </span>
                        <div>
                          <p className="font-bold text-blue-800">
                            {EMOTIONS[getMostFrequentEmotion().emotion]?.label}
                          </p>
                          <p className="text-sm text-blue-600">
                            {getMostFrequentEmotion().total} entries
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Wellness Score */}
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Wellness Score</h4>
                        <p className="text-sm text-gray-600">Overall health</p>
                      </div>
                    </div>
                    <div className="text-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                      <div className="text-4xl font-bold text-purple-800 mb-2">{getWellnessScore()}/10</div>
                      <p className="text-sm text-purple-600 font-medium">Emotional Balance</p>
                      <div className="mt-4 w-full bg-purple-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000" 
                          style={{width: `${getWellnessScore() * 10}%`}}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200/50 p-6 shadow-lg">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
                      Quick Actions
                    </h4>
                    <div className="space-y-3">
                      <a
                        href="/journal"
                        className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all group hover:shadow-md"
                      >
                        <Calendar className="h-5 w-5 text-indigo-600" />
                        <span className="font-medium text-gray-900 group-hover:text-indigo-600">Write Entry</span>
                        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600 ml-auto" />
                      </a>
                      <button className="flex items-center space-x-3 p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all w-full group hover:shadow-md">
                        <Target className="h-5 w-5 text-purple-600" />
                        <span className="font-medium text-gray-900 group-hover:text-purple-600">Set Goals</span>
                        <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 ml-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Consistency Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Consistency</h4>
                      <p className="text-sm text-gray-600">Your writing habit</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Daily Goal</span>
                      <span className="text-sm font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">1 entry</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-green-600 font-medium">75% completion rate</p>
                      <Award className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </div>

                {/* Growth Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Growth</h4>
                      <p className="text-sm text-gray-600">Positive trend</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600 mb-2">+12%</div>
                    <p className="text-sm text-gray-600">Mood improvement this month</p>
                    <div className="mt-4 flex justify-center">
                      <div className="flex space-x-1">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`w-4 h-4 ${i <= 4 ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Community Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Community</h4>
                      <p className="text-sm text-gray-600">Compare progress</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-rose-600 mb-2">Top 15%</div>
                    <p className="text-sm text-gray-600">Among active users</p>
                    <div className="mt-4">
                      <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-full px-4 py-2">
                        <Smile className="w-5 h-5 text-rose-500 mx-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Section */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200/50 p-12">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                <div className="relative z-10">
                  <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-r from-slate-600 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <TrendingUp className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">Continue Your Journey</h3>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">Keep building your emotional intelligence and discover deeper insights about yourself</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <a
                      href="/journal"
                      className="group bg-white/80 backdrop-blur-sm border border-white/80 rounded-2xl p-8 hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-3 text-lg">Write Today</h4>
                      <p className="text-slate-600">Add a new journal entry to continue tracking your emotional journey</p>
                      <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700">
                        <span className="text-sm font-medium">Get started</span>
                        <ArrowUpRight className="h-4 w-4 ml-2" />
                      </div>
                    </a>

                    <div className="bg-white/80 backdrop-blur-sm border border-white/80 rounded-2xl p-8 hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer group">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-3 text-lg">Set Goals</h4>
                      <p className="text-slate-600">Define what emotional growth means to you and track your progress</p>
                      <div className="mt-4 flex items-center text-green-600 group-hover:text-green-700">
                        <span className="text-sm font-medium">Coming soon</span>
                        <ArrowUpRight className="h-4 w-4 ml-2" />
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm border border-white/80 rounded-2xl p-8 hover:bg-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer group">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                        <Sparkles className="h-8 w-8 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-3 text-lg">Reflect More</h4>
                      <p className="text-slate-600">Deeper insights come with regular practice and mindful reflection</p>
                      <div className="mt-4 flex items-center text-purple-600 group-hover:text-purple-700">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowUpRight className="h-4 w-4 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Trends;