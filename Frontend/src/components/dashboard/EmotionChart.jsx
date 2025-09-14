// src/components/dashboard/RecentEntries.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { EMOTIONS } from '../../utils/constants';
import { ArrowRight, Clock, BookOpen, Plus } from 'lucide-react';

const RecentEntries = ({ entries = [] }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const getTimeIcon = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.abs(now - date) / (1000 * 60 * 60);
    
    if (diffHours < 24) return '🌟';
    if (diffHours < 48) return '✨';
    return '💭';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 h-12 w-12 rounded-full bg-gradient-to-br from-green-100/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-8 w-8 rounded-full bg-gradient-to-tr from-blue-100/50 to-transparent"></div>
      
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recent Entries</h3>
              <p className="text-sm text-gray-600">Your latest thoughts</p>
            </div>
          </div>
          <Link
            to="/journal"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <span className="hidden sm:inline">View all</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No entries yet</h4>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Start your journey by writing your first journal entry. It's a great way to reflect on your day.
            </p>
            <Link
              to="/journal"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>Write your first entry</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.slice(0, 4).map((entry, index) => {
              const emotion = EMOTIONS[entry.detectedEmotion] || EMOTIONS.neutral;
              
              return (
                <div 
                  key={entry._id} 
                  className={`
                    relative group p-6 rounded-2xl border border-gray-200/50 
                    hover:border-gray-300/50 transition-all duration-300
                    ${index === 0 ? 'bg-gradient-to-r from-blue-50/50 to-indigo-50/50' :
                      index === 1 ? 'bg-gradient-to-r from-purple-50/50 to-pink-50/50' :
                      index === 2 ? 'bg-gradient-to-r from-green-50/50 to-emerald-50/50' :
                      'bg-gradient-to-r from-orange-50/50 to-amber-50/50'
                    }
                    hover:shadow-lg hover:-translate-y-1 cursor-pointer
                  `}
                >
                  {/* Entry header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                        <span className="text-2xl">{emotion.emoji}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 capitalize">
                          {emotion.label}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{getTimeIcon(entry.date)}</span>
                          <span>{formatDate(entry.date)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Entry preview */}
                  <div className="relative">
                    <p className="text-gray-700 leading-relaxed line-clamp-3">
                      {truncateText(entry.text)}
                    </p>
                    {entry.text.length > 120 && (
                      <div className="absolute bottom-0 right-0 bg-gradient-to-l from-white/90 to-transparent pl-8 pr-2">
                        <span className="text-sm text-indigo-600 font-medium group-hover:text-indigo-700">
                          Read more
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Progress indicator for recent entries */}
                  {index === 0 && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Latest
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Show more button if there are more than 4 entries */}
        {entries.length > 4 && (
          <div className="mt-6 text-center">
            <Link
              to="/journal"
              className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-xl font-medium hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
            >
              <span>View {entries.length - 4} more entries</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentEntries;