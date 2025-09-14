// src/components/dashboard/RecentEntries.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { EMOTIONS } from '../../utils/constants';
import { ArrowRight, Clock } from 'lucide-react';

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

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary-500" />
          <span>Recent Entries</span>
        </h3>
        <Link
          to="/journal"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
        >
          <span>View all</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No recent entries</p>
          <Link
            to="/journal"
            className="inline-block mt-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            Write your first entry
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.slice(0, 3).map((entry) => {
            const emotion = EMOTIONS[entry.detectedEmotion] || EMOTIONS.neutral;
            
            return (
              <div key={entry._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{emotion.emoji}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {emotion.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {truncateText(entry.text)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentEntries;