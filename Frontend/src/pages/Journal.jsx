// src/pages/Journal.jsx
import React, { useState } from 'react';
import Header from '../components/common/Header';
import CreateEntry from '../components/journal/CreateEntry';
import JournalList from '../components/journal/JournalList';
import { BookOpen, PenTool, Sparkles, Heart, Calendar, TrendingUp } from 'lucide-react';

const Journal = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEntryCreated = (newEntry) => {
    // Trigger refresh of journal list
    setRefreshTrigger(prev => prev + 1);
  };

  const getInspirationalQuote = () => {
    const quotes = [
      "Your journal is a place where your thoughts find their voice",
      "Every word you write is a step toward understanding yourself",
      "In the pages of your journal lies the story of your growth",
      "Writing is the art of discovering what you believe",
      "Your thoughts matter. Your feelings are valid. Your story is important."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <BookOpen className="h-8 w-8 text-yellow-300" />
                <h1 className="text-4xl font-bold">Your Sacred Space</h1>
              </div>
              <p className="text-xl text-white/90 mb-6 max-w-3xl leading-relaxed">
                {getInspirationalQuote()}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-xl font-medium text-white">
                  <PenTool className="h-5 w-5" />
                  <span>Express • Reflect • Grow</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50 p-6">
              <div className="absolute top-0 right-0 -mr-2 -mt-2 h-12 w-12 rounded-full bg-blue-200/30"></div>
              <div className="relative flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900">Today's Date</h3>
                  <p className="text-blue-700 font-medium">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/50 p-6">
              <div className="absolute bottom-0 left-0 -ml-2 -mb-2 h-12 w-12 rounded-full bg-emerald-200/30"></div>
              <div className="relative flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900">Mindful Moment</h3>
                  <p className="text-emerald-700 font-medium">Take a deep breath</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200/50 p-6">
              <div className="absolute top-0 left-0 -ml-2 -mt-2 h-12 w-12 rounded-full bg-violet-200/30"></div>
              <div className="relative flex items-center space-x-4">
                <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-violet-900">Your Journey</h3>
                  <p className="text-violet-700 font-medium">Every word matters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Enhanced Create Entry Section */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25"></div>
              <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6 border-b border-gray-200/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <PenTool className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Create New Entry</h2>
                      <p className="text-gray-600">Share what's on your mind today</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <CreateEntry onEntryCreated={handleEntryCreated} />
                </div>
              </div>
            </div>

            {/* Enhanced Journal List Section */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Your Entries</h2>
                        <p className="text-gray-600">Revisit your thoughts and emotions</p>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-white/80 px-4 py-2 rounded-xl">
                      <TrendingUp className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm font-medium text-indigo-900">Track Progress</span>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <JournalList refreshTrigger={refreshTrigger} />
                </div>
              </div>
            </div>

            {/* Motivational Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Writing Tips */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 p-8">
                <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 rounded-full bg-amber-200/30"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-amber-900">Writing Prompts</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-amber-800 font-medium">
                      • What made you smile today?
                    </p>
                    <p className="text-amber-800 font-medium">
                      • What are you grateful for right now?
                    </p>
                    <p className="text-amber-800 font-medium">
                      • How did you overcome a challenge today?
                    </p>
                    <p className="text-amber-800 font-medium">
                      • What do you want to remember about today?
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 p-8">
                <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-16 w-16 rounded-full bg-green-200/30"></div>
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-green-900">Why Journal?</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-green-800 font-medium">
                      • Improves mental clarity and focus
                    </p>
                    <p className="text-green-800 font-medium">
                      • Reduces stress and anxiety
                    </p>
                    <p className="text-green-800 font-medium">
                      • Enhances self-awareness
                    </p>
                    <p className="text-green-800 font-medium">
                      • Tracks personal growth over time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Journal;