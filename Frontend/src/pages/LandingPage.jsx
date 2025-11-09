import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  TrendingUp, 
  Heart, 
  Shield, 
  ArrowRight, 
  Star,
  BarChart3,
  CheckCircle,
  Sparkles,
  Menu,
  X,
  Play,
  Zap,
  Users,
  Brain,
  Eye,
  Globe,
  Award,
  Smartphone,
  Lock,
  ChevronRight,
  Check,
  Quote
} from 'lucide-react';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Optimized scroll handler
  useEffect(() => {
    let timeoutId = null;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = useMemo(() => [
    {
      icon: Brain,
      title: "AI-Powered Emotion Insights",
      description: "Advanced emotion tracking with intelligent pattern recognition and personalized insights to understand your mental health journey.",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50",
      benefits: ["Real-time emotion analysis", "Pattern recognition", "Personalized insights", "Mental health tracking"]
    },
    {
      icon: BarChart3,
      title: "Beautiful Analytics Dashboard",
      description: "Visualize your progress with stunning charts, trend analysis, and detailed reports that make your data meaningful.",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      benefits: ["Interactive visualizations", "Trend analysis", "Progress tracking", "Custom reports"]
    },
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Your thoughts are protected with enterprise-level encryption and zero-knowledge architecture. Your data belongs to you.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50",
      benefits: ["End-to-end encryption", "Zero-knowledge architecture", "Complete privacy", "GDPR compliant"]
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Sync",
      description: "Access your journal anywhere with real-time sync across all your devices. Write on mobile, review on desktop.",
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
      benefits: ["Real-time sync", "Offline support", "Multi-device access", "Cloud backup"]
    }
  ], []);

  const benefits = useMemo(() => [
    { icon: Zap, text: "Smart writing prompts powered by AI" },
    { icon: Globe, text: "Cross-device sync with offline support" },
    { icon: Eye, text: "Advanced mood pattern recognition" },
    { icon: Award, text: "Export in multiple formats (PDF, JSON, CSV)" },
    { icon: Users, text: "HIPAA-compliant data handling" },
    { icon: Heart, text: "24/7 customer support" }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: "Dr. Sarah Chen",
      role: "Clinical Psychologist • Stanford Medicine",
      content: "The emotion analytics in this platform are remarkably sophisticated. I've seen significant improvements in my clients' self-awareness and therapeutic outcomes.",
      avatar: "SC",
      rating: 5,
      company: "Stanford Medicine"
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior UX Designer • Google",
      content: "Finally, a journaling app that doesn't compromise on design. The interface is intuitive, beautiful, and actually makes me want to write every day.",
      avatar: "MR", 
      rating: 5,
      company: "Google"
    },
    {
      name: "Dr. Priya Patel",
      role: "Mindfulness Researcher • MIT",
      content: "The data insights are incredible. This platform transforms journaling from a simple habit into a powerful tool for understanding mental patterns.",
      avatar: "PP",
      rating: 5,
      company: "MIT"
    },
    {
      name: "James Wilson",
      role: "Mental Health Advocate • Headspace",
      content: "As someone who's struggled with anxiety, this app has been life-changing. The AI insights help me understand my triggers and patterns.",
      avatar: "JW",
      rating: 5,
      company: "Headspace"
    }
  ], []);

  const stats = useMemo(() => [
    { number: "50K+", label: "Active Writers", icon: Users, color: "from-blue-500 to-indigo-500" },
    { number: "2M+", label: "Journal Entries", icon: BookOpen, color: "from-emerald-500 to-teal-500" },
    { number: "98%", label: "User Retention", icon: Heart, color: "from-rose-500 to-pink-500" },
    { number: "4.9★", label: "App Store Rating", icon: Star, color: "from-yellow-500 to-orange-500" }
  ], []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-violet-500/5 border-b border-violet-100/50' 
          : 'bg-white/80 backdrop-blur-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-xl transition-all duration-300">
                <img
                  src="/logo.png"
                  alt="AI Health Journal Logo"
                  className="w-5 h-5 lg:w-7 lg:h-7 object-contain"
                  loading="eager"
                />
              </div>
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                AI Health Journal
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#features" className="text-gray-600 hover:text-violet-600 transition-colors font-medium text-sm lg:text-base">
                Features
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-violet-600 transition-colors font-medium text-sm lg:text-base">
                Reviews  
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-violet-600 transition-colors font-medium text-sm lg:text-base">
                Pricing
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-violet-600 transition-colors font-medium text-sm lg:text-base"
              >
                Sign in
              </Link>
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transform hover:-translate-y-0.5 text-sm lg:text-base"
              >
                Get started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-900" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-violet-100/50 py-4 bg-white/95 backdrop-blur-xl rounded-b-2xl">
              <div className="space-y-4">
                <a href="#features" className="block text-gray-600 hover:text-violet-600 transition-colors py-2 text-base">Features</a>
                <a href="#testimonials" className="block text-gray-600 hover:text-violet-600 transition-colors py-2 text-base">Reviews</a>
                <a href="#pricing" className="block text-gray-600 hover:text-violet-600 transition-colors py-2 text-base">Pricing</a>
                <div className="pt-4 border-t border-violet-100/50 space-y-3">
                  <Link to="/login" className="block text-gray-600 hover:text-violet-600 transition-colors py-2 text-base">Sign in</Link>
                  <Link to="/signup" className="block bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-center shadow-lg">
                    Get started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-violet-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 lg:w-80 lg:h-80 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            {/* Floating Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-violet-200/50 rounded-full px-4 lg:px-6 py-2 mb-6 lg:mb-8 shadow-lg shadow-violet-500/10 animate-float">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span className="text-xs lg:text-sm font-medium text-violet-700">Join 50K+ mindful writers worldwide</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 lg:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Transform Your
              </span>
              <br />
              <span className="text-gray-900">Mental Wellness</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              The most advanced AI-powered journaling platform with intelligent insights, 
              beautiful analytics, and military-grade privacy. Your journey to self-discovery starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-12 lg:mb-16 px-4">
              <Link 
                to="/signup"
                className="group inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-violet-500/25 hover:shadow-3xl hover:shadow-violet-500/30"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-violet-200/50 text-violet-700 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl font-bold text-base lg:text-lg hover:bg-white/90 hover:border-violet-300 transition-all duration-300 shadow-xl shadow-violet-500/10 hover:shadow-2xl">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-16 lg:mb-20 px-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className={`inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${stat.color} rounded-2xl mb-2 lg:mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <div className={`text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                      {stat.number}
                    </div>
                    <div className="text-sm lg:text-base text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Product Preview */}
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-3xl blur-2xl transform rotate-1"></div>
              <div className="relative bg-white/60 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-violet-200/50 p-4 lg:p-8 shadow-2xl shadow-violet-500/20">
                <div className="bg-white rounded-xl lg:rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
                  {/* Mock Dashboard Header */}
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-4 lg:p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold">Good morning, Alex!</h3>
                        <p className="text-violet-100 text-sm lg:text-base">Ready to capture today's thoughts?</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-6 w-6 lg:h-8 lg:w-8 text-yellow-300" />
                        <span className="text-xs lg:text-sm bg-white/20 rounded-full px-2 lg:px-3 py-1">AI Ready</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-blue-200/50">
                        <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                          <BookOpen className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" />
                          <span className="font-semibold text-blue-900 text-sm lg:text-base">Total Entries</span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-blue-600">127</div>
                        <div className="text-xs text-blue-500 mt-1">+12 this week</div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-emerald-200/50">
                        <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                          <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-emerald-600" />
                          <span className="font-semibold text-emerald-900 text-sm lg:text-base">Streak</span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-emerald-600">23 days</div>
                        <div className="text-xs text-emerald-500 mt-1">Personal best!</div>
                      </div>
                      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-rose-200/50">
                        <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                          <Heart className="h-4 w-4 lg:h-5 lg:w-5 text-rose-600" />
                          <span className="font-semibold text-rose-900 text-sm lg:text-base">Mood</span>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-rose-600">Optimistic</div>
                        <div className="text-xs text-rose-500 mt-1">Trending up ↗</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-3 lg:p-4 border border-gray-200/50">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Recent Entry</span>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <div className="h-2 lg:h-3 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full w-full"></div>
                        <div className="h-2 lg:h-3 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full w-4/5"></div>
                        <div className="h-2 lg:h-3 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              Powerful features for
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> modern journaling</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build a meaningful journaling practice with cutting-edge AI technology
            </p>
          </div>

          {/* Featured Feature Display */}
          <div className="mb-12 lg:mb-16">
            <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-gradient-to-br from-gray-50 to-white border shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center p-6 lg:p-12">
                {/* Feature Content */}
                <div className="space-y-4 lg:space-y-6">
                  <div className={`inline-flex p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-gradient-to-r ${features[activeFeature].bgGradient}`}>
                    {(() => {
                      const IconComponent = features[activeFeature].icon;
                      return (
                        <IconComponent
                          className={`text-xl lg:text-2xl bg-gradient-to-r ${features[activeFeature].gradient} bg-clip-text text-transparent`} 
                          size={24}
                        />
                      );
                    })()}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    {features[activeFeature].title}
                  </h3>
                  
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                    {features[activeFeature].description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-2 lg:space-y-3">
                    {features[activeFeature].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${features[activeFeature].gradient}`} />
                        <span className="text-gray-700 text-sm lg:text-base">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r ${features[activeFeature].gradient} text-white rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-sm lg:text-base`}>
                    Learn More
                    <ArrowRight className="ml-2" size={16} />
                  </button>
                </div>

                {/* Feature Visualization */}
                <div className="relative order-first lg:order-last">
                  <div className={`bg-gradient-to-br ${features[activeFeature].bgGradient} rounded-xl lg:rounded-2xl p-6 lg:p-8 h-64 lg:h-80 flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = features[activeFeature].icon;
                      return (
                        <IconComponent 
                          className={`bg-gradient-to-r ${features[activeFeature].gradient} bg-clip-text text-transparent`}
                          size={80}
                        />
                      );
                    })()}
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 lg:-top-4 lg:-right-4 w-12 h-12 lg:w-20 lg:h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                    <div className={`w-4 h-4 lg:w-8 lg:h-8 bg-gradient-to-r ${features[activeFeature].gradient} rounded-full`} />
                  </div>
                  <div className="absolute -bottom-2 -left-2 lg:-bottom-4 lg:-left-4 w-10 h-10 lg:w-16 lg:h-16 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
                    <div className={`w-3 h-3 lg:w-6 lg:h-6 bg-gradient-to-r ${features[activeFeature].gradient} rounded-full`} />
                  </div>
                </div>
              </div>

              {/* Feature Navigation */}
              <div className="flex justify-center p-4 lg:p-6 border-t border-gray-100">
                <div className="flex space-x-3 lg:space-x-4">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all ${
                        index === activeFeature 
                          ? 'bg-violet-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                      aria-label={`Feature ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-200/50">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8 text-center">Everything you need included</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 lg:space-x-4 group">
                    <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-xl transition-all duration-300">
                      <Icon className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors text-sm lg:text-base">{benefit.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section id="testimonials" className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-violet-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 lg:w-80 lg:h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              Trusted by
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> professionals worldwide</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600">See what experts and users say about our platform</p>
          </div>

          {/* Main Testimonial */}
          <div className="max-w-4xl mx-auto mb-12 lg:mb-16">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-12 border border-violet-200/50 shadow-xl shadow-violet-500/10">
              <div className="text-center">
                <Quote className="mx-auto text-violet-600 mb-4 lg:mb-6" size={40} />
                
                <div className="flex justify-center space-x-1 mb-4 lg:mb-6">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 lg:h-6 lg:w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 mb-6 lg:mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-center space-x-3 lg:space-x-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center text-white font-bold text-sm lg:text-lg shadow-lg">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 text-base lg:text-lg">
                      {testimonials[activeTestimonial].name}
                    </h4>
                    <p className="text-gray-600 text-sm lg:text-base">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-3 lg:space-x-4 mt-6 lg:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all ${
                    index === activeTestimonial 
                      ? 'bg-violet-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`bg-white/60 backdrop-blur-xl rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-violet-200/50 shadow-lg transition-all cursor-pointer ${
                  index === activeTestimonial 
                    ? 'ring-2 ring-violet-500 transform scale-105 shadow-2xl' 
                    : 'hover:shadow-xl'
                }`}
                onClick={() => setActiveTestimonial(index)}
              >
                <div className="flex items-center mb-3 lg:mb-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center text-white font-bold mr-3 text-sm lg:text-base">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm lg:text-base">{testimonial.name}</h5>
                    <p className="text-xs lg:text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="flex mb-2 lg:mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={14} />
                  ))}
                </div>
                
                <p className="text-gray-700 text-xs lg:text-sm leading-relaxed line-clamp-3">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Pricing */}
      <section id="pricing" className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              Simple, transparent
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> pricing</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600">Start free, scale as you grow</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Free Plan */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-gray-200/50 shadow-xl relative group hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">Free<span className="text-base lg:text-lg font-normal text-gray-500">/forever</span></div>
              <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
                  <span className="text-gray-700 text-sm lg:text-base">Unlimited entries</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
                  <span className="text-gray-700 text-sm lg:text-base">Basic emotion tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
                  <span className="text-gray-700 text-sm lg:text-base">Mobile & web access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-500" />
                  <span className="text-gray-700 text-sm lg:text-base">Basic analytics</span>
                </li>
              </ul>
              <Link 
                to="/signup"
                className="w-full bg-gray-900 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-semibold hover:bg-gray-800 transition-colors text-center block shadow-lg text-sm lg:text-base"
              >
                Get started free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative">
              <div className="absolute -top-4 lg:-top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 lg:px-6 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl lg:rounded-3xl p-6 lg:p-8 border-2 border-violet-200 shadow-2xl shadow-violet-500/20 relative group hover:shadow-3xl hover:shadow-violet-500/30 transition-all duration-300">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">$12<span className="text-base lg:text-lg font-normal text-gray-500">/month</span></div>
                <ul className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-violet-600" />
                    <span className="text-gray-700 text-sm lg:text-base">Everything in Starter</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-violet-600" />
                    <span className="text-gray-700 text-sm lg:text-base">AI-powered insights</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-violet-600" />
                    <span className="text-gray-700 text-sm lg:text-base">Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-violet-600" />
                    <span className="text-gray-700 text-sm lg:text-base">Export & backup features</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-violet-600" />
                    <span className="text-gray-700 text-sm lg:text-base">Priority support</span>
                  </li>
                </ul>
                <Link 
                  to="/signup"
                  className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 text-center block shadow-lg shadow-violet-500/25 hover:shadow-xl transform hover:-translate-y-0.5 text-sm lg:text-base"
                >
                  Start 14-day free trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute -top-4 -right-4 h-16 w-16 lg:h-24 lg:w-24 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-6 -left-6 h-20 w-20 lg:h-32 lg:w-32 rounded-full bg-white/10 blur-2xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 lg:px-6 py-2 mb-6 lg:mb-8">
            <Zap className="h-4 w-4 text-yellow-300" />
            <span className="text-xs lg:text-sm font-medium text-white">Join the future of journaling</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6">
            Ready to transform your mind?
          </h2>
          <p className="text-lg lg:text-xl text-white/90 mb-8 lg:mb-10 max-w-2xl mx-auto">
            Join over 50,000 people who have discovered the power of AI-powered journaling. 
            Your journey of self-discovery starts today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Link 
              to="/signup"
              className="inline-flex items-center justify-center space-x-3 bg-white text-violet-700 px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span>Start writing today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              to="/login"
              className="inline-flex items-center justify-center space-x-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg hover:bg-white/30 transition-all duration-300"
            >
              <span>Sign in</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
            <div className="sm:col-span-2">
              <Link to="/" className="flex items-center space-x-3 mb-4 lg:mb-6">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <img
                    src="/logo.png"
                    alt="AI Health Journal Logo"
                    className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                  />
                </div>
                <span className="text-lg lg:text-xl font-bold text-white">AI Health Journal</span>
              </Link>
              <p className="text-gray-400 mb-4 lg:mb-6 max-w-md leading-relaxed text-sm lg:text-base">
                The most advanced AI-powered journaling platform with intelligent insights, 
                beautiful analytics, and military-grade privacy.
              </p>
              <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-500">
                <Lock className="h-3 w-3 lg:h-4 lg:w-4" />
                <span>Your data is encrypted and completely private</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Product</h3>
              <ul className="space-y-2 lg:space-y-3 text-gray-400 text-sm lg:text-base">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3 lg:mb-4 text-sm lg:text-base">Company</h3>
              <ul className="space-y-2 lg:space-y-3 text-gray-400 text-sm lg:text-base">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-6 lg:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-xs lg:text-sm">
                © 2025 AI Health Journal. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-500">
                <Heart className="h-3 w-3 lg:h-4 lg:w-4 fill-red-500 text-red-500" />
                <span>Made with care for your mental wellbeing</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;