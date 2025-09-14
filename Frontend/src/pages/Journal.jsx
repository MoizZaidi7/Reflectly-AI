// src/pages/Journal.jsx
import React, { useState } from 'react';
import Header from '../components/common/Header';
import CreateEntry from '../components/journal/CreateEntry';
import JournalList from '../components/journal/JournalList';

const Journal = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEntryCreated = (newEntry) => {
    // Trigger refresh of journal list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Journal
            </h1>
            <p className="text-gray-600">
              Express your thoughts and track your emotional journey
            </p>
          </div>

          <div className="space-y-8">
            <CreateEntry onEntryCreated={handleEntryCreated} />
            <JournalList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Journal;