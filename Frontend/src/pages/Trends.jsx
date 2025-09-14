// src/pages/Trends.jsx
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Header from '../components/common/Header';
import EmotionChart from '../components/dashboard/EmotionChart';
import Loading from '../components/common/Loading';
import { journalAPI } from '../services/api';
import { EMOTIONS } from '../utils/constants';
import { BarChart3, Calendar, TrendingUp } from 'lucide-react';

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
      const trends = response.data.data;
      
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
    // Create a map of dates to emotions
    const dateMap = new Map();
    
    trends.forEach(trend => {
      trend.data.forEach(dataPoint => {
        if (!dateMap.has(dataPoint.date)) {
          dateMap.set(dataPoint.date, {});
        }
        dateMap.get(dataPoint.date)[trend.emotion] = dataPoint.count;
      });
    });

    // Convert to array format for recharts
    const timelineArray = Array.from(dateMap.entries())
      .map(([date, emotions]) => ({
        date,
        ...emotions,
        total: Object.values(emotions).reduce((sum, count) => sum + count, 0)
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
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium mb-2">{formatDate(label)}</p>
          {payload.map((entry, index) => {
            const emotion = EMOTIONS[entry.dataKey];
            if (emotion && entry.value > 0) {
              return (
                <p key={index} className="text-xs" style={{ color: emotion.color }}>
                  {emotion.emoji} {emotion.label}: {entry.value}
                </p>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return null;
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
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-primary-500" />
              <span>Emotion Trends</span>
            </h1>
            <p className="text-gray-600">
              Analyze your emotional patterns and track your mental health journey
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Period Selector */}
          <div className="mb-8">
            <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border border-gray-200 inline-flex">
              {periods.map(period => (
                <button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedPeriod === period.value
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {trendsData.length === 0 ? (
            <div className="card text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
              <p className="text-gray-600">Start writing journal entries to see your emotion trends!</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Emotion Distribution Chart */}
              <EmotionChart 
                data={trendsData}
                title={`Emotion Distribution (Last ${selectedPeriod} Days)`}
              />

              {/* Timeline Chart */}
              {timelineData.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Daily Emotion Timeline
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={formatDate}
                          fontSize={12}
                        />
                        <YAxis fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        {Object.entries(EMOTIONS).map(([emotion, config]) => (
                          <Line
                            key={emotion}
                            type="monotone"
                            dataKey={emotion}
                            stroke={config.color}
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            connectNulls={false}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Insights */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trendsData.length > 0 && (
                    <>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">Most Frequent Emotion</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">
                            {EMOTIONS[trendsData.reduce((max, current) => 
                              max.total > current.total ? max : current
                            ).emotion]?.emoji}
                          </span>
                          <div>
                            <p className="text-blue-800 font-medium">
                              {EMOTIONS[trendsData.reduce((max, current) => 
                                max.total > current.total ? max : current
                              ).emotion]?.label}
                            </p>
                            <p className="text-sm text-blue-600">
                              {trendsData.reduce((max, current) => 
                                max.total > current.total ? max : current
                              ).total} entries
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-900 mb-2">Total Entries</h4>
                        <p className="text-2xl font-bold text-green-800">
                          {trendsData.reduce((sum, trend) => sum + trend.total, 0)}
                        </p>
                        <p className="text-sm text-green-600">
                          In the last {selectedPeriod} days
                        </p>
                      </div>
                    </>
                  )}
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