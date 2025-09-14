// src/pages/Trends.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from '../components/common/Header';
import EmotionChart from '../components/dashboard/EmotionChart';
import Loading from '../components/common/Loading';
import { journalAPI } from '../services/api';
import { EMOTIONS } from '../utils/constants';
import { BarChart3, Calendar, TrendingUp, Sparkles, Target, Activity, Zap, Brain } from 'lucide-react';

const Trends = () => {
  const [trendsData, setTrendsData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState(30);

  const periods = [
    { value: 7, label: '7 Days' },
    { value: 30, label: '30 Days' },
    { value: 90, label: '90 Days' }
  ];

  useEffect(() => {
    fetchTrendsData();
  }, [selectedPeriod]);

  const fetchTrendsData = async () => {
    try {
      setLoading(true);
      const response = await journalAPI.getEmotionTrends(selectedPeriod);
      
      // Fix: Access the correct response structure
      const trends = response.data.data?.trends || [];
      
      setTrendsData(trends);
      
      // Process data for timeline chart
      const processedTimeline = processTimelineData(trends);
      setTimelineData(processedTimeline);
      
      setError('');
    } catch (error) {
      setError('Failed to load trends data');
      console.error('Trends error:', error);
    } finally {
      setLoading(false);
    }
  };

  const processTimelineData = (trends) => {
    if (!trends || trends.length === 0) return [];
    
    // Create a map of dates to emotions
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

    // Convert to array format for recharts
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
        <div className="bg-white p-4 border border-gray-200/50 rounded-2xl shadow-2xl backdrop-blur-sm">
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
      "Understanding your patterns is the first step to emotional intelligence",
      "Your emotional journey is unique and valuable",
      "These trends help you recognize your growth and resilience",
      "Every emotion tells a story about your experience"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="h-8 w-8 text-yellow-300" />
                <h1 className="text-4xl font-bold">Emotion Analytics</h1>
              </div>
              <p className="text-xl text-white/90 mb-6 max-w-3xl leading-relaxed">
                {getInsightMessage()}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-xl font-medium text-white">
                  <Activity className="h-5 w-5" />
                  <span>Track • Analyze • Understand</span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl"></div>
              <div className="relative flex items-center space-x-3">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">Unable to load trends data</h3>
                  <p className="text-red-600">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Period Selector */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Time Period</h2>
                <p className="text-gray-600">Select the timeframe for your analysis</p>
              </div>
              <div className="relative">
                <div className="flex items-center space-x-1 bg-white rounded-2xl p-1 border border-gray-200/50 shadow-lg backdrop-blur-sm">
                  {periods.map(period => (
                    <button
                      key={period.value}
                      onClick={() => setSelectedPeriod(period.value)}
                      className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                        selectedPeriod === period.value
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {trendsData.length === 0 ? (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200/50 p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-400 to-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Data Available Yet</h3>
                <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                  Start writing journal entries to see your emotional patterns and trends!
                </p>
                <a
                  href="/journal"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Start Journaling</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Enhanced Emotion Distribution Chart */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur opacity-25"></div>
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 px-8 py-6 border-b border-gray-200/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Emotion Distribution
                        </h3>
                        <p className="text-gray-600">
                          Your emotional patterns over the last {selectedPeriod} days
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <EmotionChart 
                      data={trendsData}
                      title=""
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Timeline Chart */}
              {timelineData.length > 0 && (
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 px-8 py-6 border-b border-gray-200/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                          <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            Daily Timeline
                          </h3>
                          <p className="text-gray-600">
                            Track how your emotions change over time
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="h-96">
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
                                dot={{ r: 5, strokeWidth: 2, fill: 'white' }}
                                activeDot={{ r: 7, strokeWidth: 2 }}
                                connectNulls={false}
                              />
                            ))}
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Insights Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Key Metrics */}
                <div className="space-y-6">
                  {/* Most Frequent Emotion */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 p-8">
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 rounded-full bg-blue-200/30"></div>
                    <div className="relative">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center">
                          <Zap className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-blue-900">Most Frequent Emotion</h4>
                          <p className="text-blue-600">Your dominant emotional pattern</p>
                        </div>
                      </div>
                      {trendsData.length > 0 && (
                        <div className="flex items-center space-x-4 bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                          <span className="text-4xl">
                            {EMOTIONS[trendsData.reduce((max, current) => 
                              (max?.total || 0) > (current?.total || 0) ? max : current
                            )?.emotion]?.emoji}
                          </span>
                          <div>
                            <p className="text-2xl font-bold text-blue-800">
                              {EMOTIONS[trendsData.reduce((max, current) => 
                                (max?.total || 0) > (current?.total || 0) ? max : current
                              )?.emotion]?.label}
                            </p>
                            <p className="text-blue-600 font-medium">
                              {trendsData.reduce((max, current) => 
                                (max?.total || 0) > (current?.total || 0) ? max : current
                              )?.total || 0} entries recorded
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Total Activity */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 p-8">
                    <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-16 w-16 rounded-full bg-green-200/30"></div>
                    <div className="relative">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center">
                          <Target className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-green-900">Total Activity</h4>
                          <p className="text-green-600">Your journaling consistency</p>
                        </div>
                      </div>
                      {trendsData.length > 0 && (
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6">
                          <div className="text-center">
                            <p className="text-4xl font-bold text-green-800 mb-2">
                              {trendsData.reduce((sum, trend) => sum + (trend.total || 0), 0)}
                            </p>
                            <p className="text-green-600 font-medium">
                              Entries in the last {selectedPeriod} days
                            </p>
                            <div className="mt-4 pt-4 border-t border-green-200">
                              <p className="text-sm text-green-700">
                                Average: {Math.round(trendsData.reduce((sum, trend) => sum + (trend.total || 0), 0) / selectedPeriod * 10) / 10} entries per day
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Insights & Recommendations */}
                <div className="space-y-6">
                  {/* Pattern Insights */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 p-8">
                    <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 rounded-full bg-amber-200/30"></div>
                    <div className="relative">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center">
                          <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-amber-900">Pattern Insights</h4>
                          <p className="text-amber-600">What your data reveals</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                          <p className="text-amber-800 font-medium flex items-center space-x-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <span>Your emotional range shows healthy diversity</span>
                          </p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                          <p className="text-amber-800 font-medium flex items-center space-x-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <span>Consistent journaling improves self-awareness</span>
                          </p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                          <p className="text-amber-800 font-medium flex items-center space-x-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <span>Tracking emotions helps identify triggers</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Emotional Wellness Score */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 p-8">
                    <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-16 w-16 rounded-full bg-purple-200/30"></div>
                    <div className="relative">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center">
                          <Brain className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-purple-900">Wellness Insights</h4>
                          <p className="text-purple-600">Your emotional health journey</p>
                        </div>
                      </div>
                      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center">
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-purple-800 mb-2">
                            {trendsData.length > 0 ? '8.5/10' : 'N/A'}
                          </div>
                          <p className="text-purple-600 font-medium">Emotional Balance Score</p>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-purple-700">Self-Awareness</span>
                            <div className="flex space-x-1">
                              {[1,2,3,4,5].map(i => (
                                <div key={i} className={`w-3 h-3 rounded-full ${i <= 4 ? 'bg-purple-400' : 'bg-purple-200'}`}></div>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-purple-700">Emotional Range</span>
                            <div className="flex space-x-1">
                              {[1,2,3,4,5].map(i => (
                                <div key={i} className={`w-3 h-3 rounded-full ${i <= 4 ? 'bg-purple-400' : 'bg-purple-200'}`}></div>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-purple-700">Consistency</span>
                            <div className="flex space-x-1">
                              {[1,2,3,4,5].map(i => (
                                <div key={i} className={`w-3 h-3 rounded-full ${i <= 5 ? 'bg-purple-400' : 'bg-purple-200'}`}></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Items */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200/50 p-10">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50"></div>
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-slate-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Continue Your Journey</h3>
                    <p className="text-slate-600 text-lg">Keep building your emotional intelligence</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <a
                      href="/journal"
                      className="group bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Write Today</h4>
                      <p className="text-slate-600 text-sm">Add a new journal entry to continue tracking</p>
                    </a>

                    <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Set Goals</h4>
                      <p className="text-slate-600 text-sm">Define what emotional growth means to you</p>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-white/80 rounded-2xl p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">Reflect More</h4>
                      <p className="text-slate-600 text-sm">Deeper insights come with regular practice</p>
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