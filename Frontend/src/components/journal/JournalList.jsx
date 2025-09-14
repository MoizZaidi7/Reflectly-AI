// src/components/journal/JournalList.jsx
import React, { useState, useEffect } from 'react';
import { journalAPI } from '../../services/api';
import JournalEntry from './JournalEntry';
import Loading from '../common/Loading';
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

const JournalList = ({ refreshTrigger }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0
  });

  const fetchEntries = async (page = 1) => {
    try {
      setLoading(true);
      const response = await journalAPI.getEntries(page, 10);
      setEntries(response.data.data);
      setPagination(response.data.pagination);
      setError('');
    } catch (error) {
      setError('Failed to load journal entries');
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, [refreshTrigger]);

  const handleEntryUpdated = (updatedEntry) => {
    setEntries(prev => 
      prev.map(entry => 
        entry._id === updatedEntry._id ? updatedEntry : entry
      )
    );
  };

  const handleEntryDeleted = (deletedId) => {
    setEntries(prev => prev.filter(entry => entry._id !== deletedId));
    setPagination(prev => ({ ...prev, total: prev.total - 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchEntries(newPage);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="card">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => fetchEntries()}
            className="mt-4 btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="card text-center">
        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No entries yet</h3>
        <p className="text-gray-600">Start writing your first journal entry above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-primary-500" />
          <span>Your Journal Entries</span>
        </h2>
        <span className="text-sm text-gray-500">
          {pagination.total} {pagination.total === 1 ? 'entry' : 'entries'} total
        </span>
      </div>

      <div className="space-y-4">
        {entries.map(entry => (
          <JournalEntry
            key={entry._id}
            entry={entry}
            onEntryUpdated={handleEntryUpdated}
            onEntryDeleted={handleEntryDeleted}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-center space-x-4 mt-8">
          <button
            onClick={() => handlePageChange(pagination.current - 1)}
            disabled={pagination.current <= 1}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-2">
            {[...Array(pagination.pages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pagination.current === page
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(pagination.current + 1)}
            disabled={pagination.current >= pagination.pages}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default JournalList;