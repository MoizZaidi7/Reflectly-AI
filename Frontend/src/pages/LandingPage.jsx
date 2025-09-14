// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Heart, 
  Shield, 
  ArrowRight, 
  Star,
  Calendar,
  BarChart3,
  Lock,
  CheckCircle,
  Sparkles,
  Menu,
  X,
  Play,
  Zap,
  Target,
  Users
} from 'lucide-react';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Heart,
      title: "AI-Powered Emotion Insights",
      description: "Advanced emotion tracking with intelligent pattern recognition and personalized insights to understand your mental health journey.",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50"
    },
    {
      icon: BarChart3,
      title: "Beautiful Analytics Dashboard",
      description: "Visualize your progress with stunning charts, trend analysis, and detailed reports that make your data meaningful.",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Your thoughts are protected with enterprise-level encryption and zero-knowledge architecture. Your data belongs to you.",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50"
    }
  ];

  const benefits = [
    "Smart writing prompts powered by AI",
    "Cross-device sync with offline support", 
    "Advanced mood pattern recognition",
    "Export in multiple formats (PDF, JSON, CSV)"
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "Clinical Psychologist • Stanford Medicine",
      content: "The emotion analytics in this platform are remarkably sophisticated. I've seen significant improvements in my clients' self-awareness and therapeutic outcomes.",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior UX Designer • Google",
      content: "Finally, a journaling app that doesn't compromise on design. The interface is intuitive, beautiful, and actually makes me want to write every day.",
      avatar: "MR", 
      rating: 5
    },
    {
      name: "Dr. Priya Patel",
      role: "Mindfulness Researcher • MIT",
      content: "The data insights are incredible. This platform transforms journaling from a simple habit into a powerful tool for understanding mental patterns.",
      avatar: "PP",
      rating: 5
    }
  ];

  const stats = [
    { number: "1K+", label: "Active Writers", icon: Users },
    { number: "10k+", label: "Journal Entries", icon: BookOpen },
    { number: "98%", label: "User Retention", icon: Heart },
    { number: "4.0★", label: "App Store Rating", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-violet-500/5 border-b border-violet-100/50' 
          : 'bg-white/60 backdrop-blur-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
<div className="flex items-center space-x-3">
  <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25 overflow-hidden bg-gradient-to-r from-violet-600 to-purple-600">
    <img
      src="/logo.png" // your image in public folder
      alt="Logo"
      className="w-9 h-9 object-contain"
    />
  </div>
  <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
    Reflectly AI
  </span>
</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">
                Features
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">
                Reviews  
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">
                Pricing
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="/login" 
                className="text-gray-600 hover:text-violet-600 transition-colors font-medium"
              >
                Sign in
              </a>
              <a 
                href="/register" 
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 transform hover:-translate-y-0.5"
              >
                Get started
              </a>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                <a href="#features" className="block text-gray-600 hover:text-violet-600 transition-colors py-2">Features</a>
                <a href="#testimonials" className="block text-gray-600 hover:text-violet-600 transition-colors py-2">Reviews</a>
                <a href="#pricing" className="block text-gray-600 hover:text-violet-600 transition-colors py-2">Pricing</a>
                <div className="pt-4 border-t border-violet-100/50 space-y-3">
                  <a href="/login" className="block text-gray-600 hover:text-violet-600 transition-colors py-2">Sign in</a>
                  <a href="/register" className="block bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-center shadow-lg">
                    Get started
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Modern Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-violet-200/50 rounded-full px-6 py-2 mb-8 shadow-lg shadow-violet-500/10">
              <Sparkles className="h-4 w-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Join 10K+ mindful writers worldwide</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Journal with
              </span>
              <br />
              <span className="text-gray-900">Intelligence</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The most advanced journaling platform with AI-powered insights, beautiful analytics, 
              and privacy-first design. Transform your thoughts into wisdom.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a 
                href="/register"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-violet-500/25 hover:shadow-3xl hover:shadow-violet-500/30"
              >
                <span>Start Writing Today</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm border-2 border-violet-200/50 text-violet-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/90 hover:border-violet-300 transition-all duration-300 shadow-xl shadow-violet-500/10 hover:shadow-2xl">
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/60 backdrop-blur-sm rounded-2xl border border-violet-200/50 mb-3 shadow-lg shadow-violet-500/10 group-hover:shadow-xl transition-all duration-300">
                      <Icon className="h-6 w-6 text-violet-600" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-1">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Preview */}
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-3xl blur-2xl transform rotate-1"></div>
              <div className="relative bg-white/60 backdrop-blur-xl rounded-3xl border border-violet-200/50 p-8 shadow-2xl shadow-violet-500/20">
                <div className="bg-white rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
                  {/* Mock Dashboard Header */}
                  <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">Good morning, Alex!</h3>
                        <p className="text-violet-100">Ready to capture today's thoughts?</p>
                      </div>
                      <Sparkles className="h-8 w-8 text-yellow-300" />
                    </div>
                  </div>
                  
                  {/* Mock Content */}
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200/50">
                        <div className="flex items-center space-x-3 mb-2">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-900">Total Entries</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">127</div>
                      </div>
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200/50">
                        <div className="flex items-center space-x-3 mb-2">
                          <TrendingUp className="h-5 w-5 text-emerald-600" />
                          <span className="font-semibold text-emerald-900">Streak</span>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">23 days</div>
                      </div>
                      <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-4 border border-rose-200/50">
                        <div className="flex items-center space-x-3 mb-2">
                          <Heart className="h-5 w-5 text-rose-600" />
                          <span className="font-semibold text-rose-900">Mood</span>
                        </div>
                        <div className="text-2xl font-bold text-rose-600">Optimistic</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/50">
                      <div className="space-y-3">
                        <div className="h-3 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full w-full"></div>
                        <div className="h-3 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full w-4/5"></div>
                        <div className="h-3 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full w-3/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful features for
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> modern journaling</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build a meaningful journaling practice with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === index;
              return (
                <div 
                  key={index}
                  className={`relative overflow-hidden rounded-3xl p-8 transition-all duration-700 transform ${
                    isActive 
                      ? `bg-gradient-to-br ${feature.bgGradient} shadow-2xl shadow-violet-500/20 scale-105 border-2 border-violet-200` 
                      : 'bg-white shadow-xl shadow-gray-500/10 hover:shadow-2xl hover:shadow-violet-500/10 border border-gray-200/50'
                  }`}
                >
                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg transform transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                  
                  {/* Animated background elements */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-r ${feature.gradient} opacity-5 rounded-full -mr-16 -mt-16 transition-all duration-700 ${isActive ? 'scale-150 opacity-10' : ''}`}></div>
                </div>
              );
            })}
          </div>

          {/* Additional Features */}
          <div className="mt-20">
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 border border-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Everything you need included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-xl transition-all duration-300">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> professionals</span>
            </h2>
            <p className="text-xl text-gray-600">See what experts and users say about our platform</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 border border-violet-200/50 shadow-xl shadow-violet-500/10 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 group">
                <div className="flex space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl transition-all duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, transparent
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent"> pricing</span>
            </h2>
            <p className="text-xl text-gray-600">Start free, scale as you grow</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-3xl p-8 border border-gray-200/50 shadow-xl relative group hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">Free<span className="text-lg font-normal text-gray-500">/forever</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Unlimited entries</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Basic emotion tracking</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Mobile & web access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">Basic analytics</span>
                </li>
              </ul>
              <a href="/register" className="w-full bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-colors text-center block shadow-lg">
                Get started free
              </a>
            </div>

            {/* Pro Plan */}
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 rounded-3xl p-8 border-2 border-violet-200 shadow-2xl shadow-violet-500/20 relative group hover:shadow-3xl hover:shadow-violet-500/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <div className="text-4xl font-bold text-gray-900 mb-6">$12<span className="text-lg font-normal text-gray-500">/month</span></div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-violet-600" />
                    <span className="text-gray-700">Everything in Starter</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-violet-600" />
                    <span className="text-gray-700">AI-powered insights</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-violet-600" />
                    <span className="text-gray-700">Advanced analytics dashboard</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-violet-600" />
                    <span className="text-gray-700">Export & backup features</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-violet-600" />
                    <span className="text-gray-700">Priority support</span>
                  </li>
                </ul>
                <a href="/register" className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-violet-700 hover:to-purple-700 transition-all duration-300 text-center block shadow-lg shadow-violet-500/25 hover:shadow-xl transform hover:-translate-y-0.5">
                  Start 14-day free trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
        <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-2 mb-8">
            <Zap className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">Join the future of journaling</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your mind?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join over 150,000 people who have discovered the power of intelligent journaling. 
            Your journey of self-discovery starts today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/register"
              className="inline-flex items-center space-x-3 bg-white text-violet-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span>Start writing today</span>
              <ArrowRight className="h-5 w-5" />
            </a>
            <a 
              href="/login"
              className="inline-flex items-center space-x-3 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all duration-300"
            >
              <span>Sign in</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Reflectly AI</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                The most advanced journaling platform with AI-powered insights, 
                beautiful analytics, and privacy-first design.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Your data is encrypted and private</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Reflectly AI. All rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  <span>Made with care for your mental wellbeing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;