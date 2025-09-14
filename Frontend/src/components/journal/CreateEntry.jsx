// src/components/journal/CreateEntry.jsx
import React, { useState } from 'react';
import { journalAPI } from '../../services/api';
import { EMOTIONS } from '../../utils/constants';
import { PenTool, Send } from 'lucide-react';
import Loading from '../common/Loading';

const CreateEntry = ({ onEntryCreated }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('Please write something in your journal entry');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await journalAPI.createEntry(text.trim());
      setText('');
      onEntryCreated(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <PenTool className="h-5 w-5 text-primary-500" />
        <h2 className="text-lg font-semibold text-gray-900">Write Today's Entry</h2>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="How are you feeling today? What's on your mind?"
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200 resize-none"
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {text.length} characters
            </span>
            {text.length > 0 && (
              <span className="text-xs text-gray-400">
                AI will detect your emotion automatically
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <Loading size="sm" />
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Save Entry</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEntry;