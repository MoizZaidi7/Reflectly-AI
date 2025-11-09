import React, { useState, useEffect } from 'react';
import { journalAPI } from '../services/api';
import CreateEntry from '../components/journal/CreateEntry';
import JournalList from '../components/journal/JournalList';
import Loading from '../components/common/Loading';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Calendar, 
  BookOpen, 
  Sparkles,
  Grid3X3,
  List,
  SortDesc,
  X,
  ArrowUpRight,
  TrendingUp,
  Heart,
  Smile,
  Clock,
  Target,
  Award,
  Star,
  BarChart3,
  RefreshCw,
  Download,
  Share2
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmotion, setFilterEmotion] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const emotions = [
    { value: 'all', label: 'All Emotions', emoji: '🌈', color: 'gray' },
    { value: 'happy', label: 'Happy', emoji: '😊', color: 'yellow' },
    { value: 'sad', label: 'Sad', emoji: '😢', color: 'blue' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'purple' },
    { value: 'angry', label: 'Angry', emoji: '😠', color: 'red' },
    { value: 'excited', label: 'Excited', emoji: '🤩', color: 'orange' },
    { value: 'grateful', label: 'Grateful', emoji: '🙏', color: 'green' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'gray' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'emotion', label: 'By Emotion' },
    { value: 'title', label: 'By Title' }
  ];

  useEffect(() => {
    fetchEntries();
  }, [currentPage, refreshTrigger]);

  const fetchEntries = async () => {
    try {
      setLoading(true);
      const response = await journalAPI.getEntries(currentPage, 10);
      const data = response.data;
      
      setEntries(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error('Error fetching entries:', error);
      toast.error('Failed to load journal entries');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchEntries();
    setIsRefreshing(false);
    toast.success('Entries refreshed!');
  };

  const handleCreateEntry = async (entryData) => {
    try {
      await journalAPI.createEntry(entryData);
      setShowCreateForm(false);
      setRefreshTrigger(prev => prev + 1);
      toast.success('Journal entry created successfully!');
    } catch (error) {
      console.error('Error creating entry:', error);
      toast.error('Failed to create journal entry');
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await journalAPI.deleteEntry(entryId);
      setRefreshTrigger(prev => prev + 1);
      toast.success('Journal entry deleted successfully');
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast.error('Failed to delete journal entry');
    }
  };

  const getFilteredAndSortedEntries = () => {
    let filtered = entries.filter(entry => {
      const matchesSearch = entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           entry.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesEmotion = filterEmotion === 'all' || entry.emotion === filterEmotion;
      return matchesSearch && matchesEmotion;
    });

    // Sort entries
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
        case 'oldest':
          return new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date);
        case 'emotion':
          return (a.emotion || '').localeCompare(b.emotion || '');
        case 'title':
          return (a.title || '').localeCompare(b.title || '');
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredEntries = getFilteredAndSortedEntries();

  const getEmotionStyle = (emotion) => {
    const styles = {
      happy: 'text-yellow-700 bg-yellow-50 border-yellow-200',
      sad: 'text-blue-700 bg-blue-50 border-blue-200',
      anxious: 'text-purple-700 bg-purple-50 border-purple-200',
      angry: 'text-red-700 bg-red-50 border-red-200',
      excited: 'text-orange-700 bg-orange-50 border-orange-200',
      grateful: 'text-green-700 bg-green-50 border-green-200',
      neutral: 'text-gray-700 bg-gray-50 border-gray-200'
    };
    return styles[emotion] || styles.neutral;
  };

  const getMonthlyEntries = () => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.date || entry.createdAt);
      const now = new Date();
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
    }).length;
  };

  const getStreakData = () => {
    // Mock streak calculation - implement actual logic
    return Math.floor(Math.random() * 15) + 1;
  };

  if (loading && entries.length === 0) {
    return <Loading message="Loading your journal entries..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold">Your Journal</h1>
                </div>
                <p className="text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
                  Capture your thoughts, track your emotions, and reflect on your journey of self-discovery
                </p>
                
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl">
                    <Target className="h-5 w-5" />
                    <span className="font-medium">{entries.length} Total Entries</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl">
                    <Calendar className="h-5 w-5" />
                    <span className="font-medium">{getMonthlyEntries()} This Month</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-xl">
                    <Award className="h-5 w-5" />
                    <span className="font-medium">{getStreakData()} Day Streak</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all transform hover:scale-105 disabled:opacity-50"
                >
                  <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <PlusCircle className="h-5 w-5" />
                  New Entry
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Create Entry Modal */}
        <AnimatePresence>
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/50"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl">
                        <Sparkles className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Entry</h2>
                        <p className="text-gray-600 dark:text-gray-400">Share your thoughts and emotions</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCreateForm(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                    >
                      <X className="h-6 w-6 text-gray-400" />
                    </button>
                  </div>
                  <CreateEntry
                    onSubmit={handleCreateEntry}
                    onCancel={() => setShowCreateForm(false)}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Filters and Controls */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-6 mb-8">
          <div className="flex flex-col space-y-6">
            {/* Top Row - Search and Main Controls */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Enhanced Search Bar */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search your thoughts, emotions, or memories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white bg-white/70 backdrop-blur-sm text-lg"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800'
                  }`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Second Row - Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Emotion Filter */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Filter by Emotion
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {emotions.map(emotion => (
                    <button
                      key={emotion.value}
                      onClick={() => setFilterEmotion(emotion.value)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                        filterEmotion === emotion.value
                          ? `${getEmotionStyle(emotion.value)} border-2 shadow-md`
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <span className="text-lg">{emotion.emoji}</span>
                      <span className="hidden sm:inline">{emotion.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="sm:w-48">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort by
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SortDesc className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white bg-white/70 backdrop-blur-sm"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || filterEmotion !== 'all') && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Active filters:
                </span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
                {filterEmotion !== 'all' && (
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border-2 ${getEmotionStyle(filterEmotion)}`}>
                    {emotions.find(e => e.value === filterEmotion)?.emoji}
                    {emotions.find(e => e.value === filterEmotion)?.label}
                    <button
                      onClick={() => setFilterEmotion('all')}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 rounded-full bg-blue-200/30 blur-xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">Total Entries</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{entries.length}</p>
              <p className="text-sm text-blue-600/70">All time collection</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-800/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-16 w-16 rounded-full bg-green-200/30 blur-xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-500 rounded-2xl shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-1">This Month</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{getMonthlyEntries()}</p>
              <p className="text-sm text-green-600/70">Recent activity</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 h-16 w-16 rounded-full bg-purple-200/30 blur-xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-500 rounded-2xl shadow-lg">
                  <Filter className="h-6 w-6 text-white" />
                </div>
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-1">Filtered Results</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">{filteredEntries.length}</p>
              <p className="text-sm text-purple-600/70">Current view</p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute bottom-0 left-0 -ml-4 -mb-4 h-16 w-16 rounded-full bg-amber-200/30 blur-xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-500 rounded-2xl shadow-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <Star className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-1">Writing Streak</h3>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">{getStreakData()}</p>
              <p className="text-sm text-amber-600/70">Days in a row</p>
            </div>
          </div>
        </div>

        {/* Journal Entries Display */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loading message="Loading more entries..." />
          </div>
        ) : filteredEntries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl p-16 border-2 border-dashed border-gray-300 dark:border-gray-600">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-blue-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <BookOpen className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {searchTerm || filterEmotion !== 'all' ? 'No entries found' : 'Start Your Journal Journey'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  {searchTerm || filterEmotion !== 'all' 
                    ? 'Try adjusting your search or filter criteria to find what you\'re looking for'
                    : 'Your thoughts and emotions are waiting to be captured. Start your first entry today!'
                  }
                </p>
                {!searchTerm && filterEmotion === 'all' && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setShowCreateForm(true)}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all transform hover:scale-105 text-lg"
                    >
                      <PlusCircle className="h-6 w-6" />
                      Create First Entry
                      <ArrowUpRight className="h-5 w-5" />
                    </button>
                    <button className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold border border-gray-300 hover:shadow-lg transition-all transform hover:scale-105 text-lg">
                      <Heart className="h-6 w-6 text-red-500" />
                      Learn More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <JournalList 
              entries={filteredEntries} 
              onDelete={handleDeleteEntry}
              loading={loading}
              viewMode={viewMode}
            />
          </motion.div>
        )}

        {/* Enhanced Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-12 p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
              >
                Previous
              </button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
              >
                Next
              </button>
            </div>
            
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Page {currentPage} of {totalPages} • {entries.length} total entries
            </div>
          </div>
        )}

        {/* Quick Actions FAB */}
        <div className="fixed bottom-8 right-8 z-40">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-4 bg-white text-gray-600 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 border border-gray-200"
            >
              <ArrowUpRight className="h-6 w-6" />
            </button>
            <button
              onClick={() => setShowCreateForm(true)}
              className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
            >
              <PlusCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;