// src/components/journal/JournalEntry.jsx
import React, { useState } from 'react';
import { EMOTIONS } from '../../utils/constants';
import { journalAPI } from '../../services/api';
import { Edit, Trash2, Save, X, Calendar, Lightbulb } from 'lucide-react';
import Loading from '../common/Loading';

const JournalEntry = ({ entry, onEntryUpdated, onEntryDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(entry.text);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const emotion = EMOTIONS[entry.detectedEmotion] || EMOTIONS.neutral;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleUpdate = async () => {
    if (!editText.trim()) return;

    setIsUpdating(true);
    try {
      const response = await journalAPI.updateEntry(entry._id, editText.trim());
      onEntryUpdated(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update entry:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    setIsDeleting(true);
    try {
      await journalAPI.deleteEntry(entry._id);
      onEntryDeleted(entry._id);
    } catch (error) {
      console.error('Failed to delete entry:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(entry.text);
    setIsEditing(false);
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: emotion.color }}
          ></div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{emotion.emoji}</span>
              <span className="font-medium text-gray-900">{emotion.label}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(entry.date)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                disabled={isUpdating || !editText.trim()}
                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {isUpdating ? <Loading size="sm" /> : <Save className="h-4 w-4" />}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={isUpdating}
                className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              >
                {isDeleting ? <Loading size="sm" /> : <Trash2 className="h-4 w-4" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        {isEditing ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200 resize-none"
            disabled={isUpdating}
          />
        ) : (
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {entry.text}
          </p>
        )}
      </div>

      {/* AI Suggestion */}
      {entry.aiSuggestion && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">AI Suggestion</h4>
              <p className="text-sm text-blue-800">{entry.aiSuggestion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalEntry;