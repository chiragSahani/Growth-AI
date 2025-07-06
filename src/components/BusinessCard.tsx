import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, Sparkles, RefreshCw, Clock, TrendingUp, Target, Search, BarChart3, Eye, Award, ChevronDown, ChevronUp, Activity, PieChart, Zap, Brain } from 'lucide-react';
import { useBusinessContext } from '../context/BusinessContext';
import RatingChart from './charts/RatingChart';
import TrendChart from './charts/TrendChart';
import CompetitorChart from './charts/CompetitorChart';
import SEOChart from './charts/SEOChart';
import MetricsGauge from './charts/MetricsGauge';
import HeatmapChart from './charts/HeatmapChart';

const BusinessCard: React.FC = () => {
  const { state, dispatch } = useBusinessContext();
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({ name: '', location: '' });

  if (!state.businessData) return null;

  const handleRegenerateHeadline = async () => {
    dispatch({ type: 'SET_REGENERATING', payload: true });

    try {
      const urlParams = new URLSearchParams({
        name: formData.name || 'Sample Business',
        location: formData.location || 'Sample Location',
      });

      const response = await fetch(`https://growth-ai-1.onrender.com/regenerate-headline?${urlParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to regenerate headline'}`);
      }

      const data = await response.json();
      dispatch({ type: 'UPDATE_HEADLINE', payload: data.headline });
    } catch (error) {
      console.error('Regenerate headline error:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to regenerate headline. Please try again.' 
      });
    }
  };

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getBusinessTypeColor = (type: string) => {
    const colors = {
      restaurant: 'from-orange-500 via-red-500 to-pink-500',
      retail: 'from-blue-500 via-indigo-500 to-purple-500',
      service: 'from-green-500 via-emerald-500 to-teal-500',
      healthcare: 'from-red-500 via-pink-500 to-rose-500',
      fitness: 'from-purple-500 via-violet-500 to-indigo-500',
      beauty: 'from-pink-500 via-rose-500 to-red-500',
      automotive: 'from-gray-500 via-slate-500 to-zinc-500',
      education: 'from-yellow-500 via-amber-500 to-orange-500',
      technology: 'from-cyan-500 via-blue-500 to-indigo-500',
      general: 'from-blue-500 via-purple-500 to-pink-500'
    };
    return colors[type as keyof typeof colors] || colors.general;
  };

  const getLocationBadge = (type: string) => {
    const badges = {
      metropolitan: { label: 'Metro Area', color: 'bg-blue-500/20 text-blue-300 border-blue-400/30' },
      suburban: { label: 'Suburban', color: 'bg-green-500/20 text-green-300 border-green-400/30' },
      smallTown: { label: 'Small Town', color: 'bg-purple-500/20 text-purple-300 border-purple-400/30' }
    };
    return badges[type as keyof typeof badges] || badges.smallTown;
  };

  const businessTypeColor = getBusinessTypeColor(state.businessData.businessType);
  const locationBadge = getLocationBadge(state.businessData.locationType);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { id: 'competition', label: 'Competition', icon: Target, color: 'from-red-500 to-orange-500' },
    { id: 'activity', label: 'Activity', icon: Activity, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <motion.div 
      className="relative w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div 
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        animate={{ 
          boxShadow: [
            "0 25px 50px rgba(0, 0, 0, 0.25)",
            "0 25px 50px rgba(59, 130, 246, 0.15)",
            "0 25px 50px rgba(147, 51, 234, 0.15)",
            "0 25px 50px rgba(0, 0, 0, 0.25)"
          ]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        {/* Header */}
        <motion.div 
          className={`bg-gradient-to-r ${businessTypeColor} px-6 py-6 relative overflow-hidden`}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ backgroundSize: "200% 100%" }}
        >
          {/* Floating particles in header */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              animate={{
                x: [Math.random() * 100, Math.random() * 100],
                y: [Math.random() * 50, Math.random() * 50],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between relative z-10">
            <div>
              <motion.h3 
                className="text-2xl sm:text-3xl font-bold text-white mb-4"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Business Analytics Dashboard
              </motion.h3>
              <div className="flex flex-wrap items-center gap-3">
                <motion.span 
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${locationBadge.color}`}
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {locationBadge.label}
                </motion.span>
                <motion.span 
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {state.businessData.businessType.charAt(0).toUpperCase() + state.businessData.businessType.slice(1)}
                </motion.span>
                <motion.span 
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30"
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  {state.businessData.confidenceScore}% Confidence
                </motion.span>
              </div>
            </div>
            <motion.div 
              className="flex items-center text-white text-sm mt-4 lg:mt-0"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Clock className="h-4 w-4 mr-2" />
              <span>Updated {formatLastUpdated(state.businessData.lastUpdated)}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <nav className="flex space-x-0 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                      : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={activeTab === tab.id ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: activeTab === tab.id ? Infinity : 0, ease: "linear" }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                  <span>{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                className="space-y-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Core Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Rating Card */}
                  <motion.div 
                    className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-400/30 backdrop-blur-sm relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    animate={{ 
                      boxShadow: [
                        "0 10px 20px rgba(0, 0, 0, 0.1)",
                        "0 10px 20px rgba(245, 158, 11, 0.2)",
                        "0 10px 20px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{ 
                      boxShadow: { duration: 3, repeat: Infinity },
                      hover: { type: "spring", stiffness: 300, damping: 30 }
                    }}
                  >
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <div className="flex items-center mb-3 relative z-10">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <Star className="h-6 w-6 text-yellow-400 mr-2" />
                      </motion.div>
                      <h4 className="font-semibold text-white">Google Rating</h4>
                    </div>
                    <div className="flex items-baseline relative z-10">
                      <motion.span 
                        className="text-3xl font-bold text-white"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {state.businessData.rating}
                      </motion.span>
                      <span className="text-lg text-gray-300 ml-1">/5</span>
                    </div>
                    <div className="flex items-center mt-2 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.1, type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              i < Math.floor(state.businessData.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-500'
                            }`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Reviews Card */}
                  <motion.div 
                    className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-400/30 backdrop-blur-sm relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    animate={{ 
                      boxShadow: [
                        "0 10px 20px rgba(0, 0, 0, 0.1)",
                        "0 10px 20px rgba(16, 185, 129, 0.2)",
                        "0 10px 20px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{ 
                      boxShadow: { duration: 3, repeat: Infinity, delay: 1 },
                      hover: { type: "spring", stiffness: 300, damping: 30 }
                    }}
                  >
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-green-400/10 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    />
                    <div className="flex items-center mb-3 relative z-10">
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Users className="h-6 w-6 text-green-400 mr-2" />
                      </motion.div>
                      <h4 className="font-semibold text-white">Reviews</h4>
                    </div>
                    <div className="flex items-baseline relative z-10">
                      <motion.span 
                        className="text-3xl font-bold text-white"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        {state.businessData.reviews}
                      </motion.span>
                      <span className="text-lg text-gray-300 ml-1">total</span>
                    </div>
                    <motion.p 
                      className="text-sm text-gray-300 mt-2 relative z-10"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {state.businessData.reviews > 200 ? 'Excellent engagement!' : 
                       state.businessData.reviews > 100 ? 'Great engagement!' : 'Growing audience'}
                    </motion.p>
                  </motion.div>

                  {/* Search Ranking Card */}
                  <motion.div 
                    className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30 backdrop-blur-sm relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    animate={{ 
                      boxShadow: [
                        "0 10px 20px rgba(0, 0, 0, 0.1)",
                        "0 10px 20px rgba(59, 130, 246, 0.2)",
                        "0 10px 20px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{ 
                      boxShadow: { duration: 3, repeat: Infinity, delay: 2 },
                      hover: { type: "spring", stiffness: 300, damping: 30 }
                    }}
                  >
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-blue-400/10 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                    />
                    <div className="flex items-center mb-3 relative z-10">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Search className="h-6 w-6 text-blue-400 mr-2" />
                      </motion.div>
                      <h4 className="font-semibold text-white">Local Ranking</h4>
                    </div>
                    <div className="flex items-baseline relative z-10">
                      <motion.span 
                        className="text-3xl font-bold text-white"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        #{state.businessData.seoMetrics.localSearchRanking}
                      </motion.span>
                      <span className="text-lg text-gray-300 ml-1">position</span>
                    </div>
                    <motion.p 
                      className="text-sm text-gray-300 mt-2 relative z-10"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                      {state.businessData.seoMetrics.localSearchRanking <= 3 ? 'Top performer!' : 'Room for growth'}
                    </motion.p>
                  </motion.div>

                  {/* Market Share Card */}
                  <motion.div 
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 backdrop-blur-sm relative overflow-hidden"
                    whileHover={{ scale: 1.02, y: -5 }}
                    animate={{ 
                      boxShadow: [
                        "0 10px 20px rgba(0, 0, 0, 0.1)",
                        "0 10px 20px rgba(147, 51, 234, 0.2)",
                        "0 10px 20px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{ 
                      boxShadow: { duration: 3, repeat: Infinity, delay: 3 },
                      hover: { type: "spring", stiffness: 300, damping: 30 }
                    }}
                  >
                    <motion.div
                      className="absolute top-0 right-0 w-20 h-20 bg-purple-400/10 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 3 }}
                    />
                    <div className="flex items-center mb-3 relative z-10">
                      <motion.div
                        animate={{ rotate: [0, 180, 360] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Target className="h-6 w-6 text-purple-400 mr-2" />
                      </motion.div>
                      <h4 className="font-semibold text-white">Market Share</h4>
                    </div>
                    <div className="flex items-baseline relative z-10">
                      <motion.span 
                        className="text-3xl font-bold text-white"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                      >
                        {state.businessData.competitorAnalysis.estimatedMarketShare}
                      </motion.span>
                    </div>
                    <motion.p 
                      className="text-sm text-gray-300 mt-2 relative z-10"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    >
                      vs {state.businessData.competitorAnalysis.localCompetitors} competitors
                    </motion.p>
                  </motion.div>
                </div>

                {/* Charts Grid */}
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <RatingChart 
                      rating={state.businessData.rating} 
                      reviews={state.businessData.reviews} 
                    />
                  </motion.div>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <MetricsGauge
                        value={state.businessData.seoMetrics.monthlySearchVolume}
                        max={2500}
                        label="Monthly Searches"
                        color="#3B82F6"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <MetricsGauge
                        value={parseInt(state.businessData.seoMetrics.onlineVisibility)}
                        max={100}
                        label="Online Visibility"
                        color="#10B981"
                        unit="%"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* SEO Headline Section */}
                <motion.div 
                  className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl p-6 border border-indigo-400/30 backdrop-blur-sm relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Animated background elements */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl"
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      opacity: [0.3, 0.6, 0.3],
                      x: [0, 20, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />

                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center mb-4 lg:mb-0">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                      >
                        <Sparkles className="h-6 w-6 text-indigo-400 mr-2" />
                      </motion.div>
                      <h4 className="font-semibold text-white">AI-Generated SEO Headline</h4>
                    </div>
                    <motion.button
                      onClick={handleRegenerateHeadline}
                      disabled={state.isRegenerating}
                      className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(99, 102, 241, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="relative z-10 flex items-center space-x-2"
                        animate={state.isRegenerating ? { x: [0, 2, -2, 0] } : {}}
                        transition={{ duration: 0.5, repeat: state.isRegenerating ? Infinity : 0 }}
                      >
                        <RefreshCw className={`h-4 w-4 ${state.isRegenerating ? 'animate-spin' : ''}`} />
                        <span>{state.isRegenerating ? 'Generating...' : 'Regenerate'}</span>
                        <Zap className="h-4 w-4" />
                      </motion.div>
                    </motion.button>
                  </div>
                  
                  <div className="relative">
                    <motion.p 
                      className="text-lg font-medium text-white leading-relaxed mb-4 relative z-10"
                      animate={{ 
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 8, repeat: Infinity }}
                      style={{
                        background: "linear-gradient(90deg, #ffffff, #a855f7, #06b6d4, #ffffff)",
                        backgroundSize: "200% 100%",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {state.businessData.headline}
                    </motion.p>
                    <AnimatePresence>
                      {state.isRegenerating && (
                        <motion.div 
                          className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center rounded-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="flex items-center space-x-2 text-indigo-300">
                            <Brain className="h-5 w-5 animate-pulse" />
                            <span className="font-medium">AI is crafting your perfect headline...</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    <motion.div 
                      className="p-4 bg-white/5 rounded-xl border border-indigo-400/20 backdrop-blur-sm"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      <p className="text-sm text-gray-300">
                        <strong className="text-indigo-300">SEO Score:</strong> Optimized for local search with business name and location targeting.
                      </p>
                    </motion.div>
                    <motion.div 
                      className="p-4 bg-white/5 rounded-xl border border-indigo-400/20 backdrop-blur-sm"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      <p className="text-sm text-gray-300">
                        <strong className="text-indigo-300">Visibility:</strong> {state.businessData.seoMetrics.onlineVisibility} online presence detected.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Business Insights */}
                <motion.div 
                  className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl p-6 border border-emerald-400/30 backdrop-blur-sm relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      opacity: [0.3, 0.6, 0.3],
                      x: [0, -20, 0],
                      y: [0, 10, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                  />

                  <div className="flex items-center mb-4 relative z-10">
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <TrendingUp className="h-6 w-6 text-emerald-400 mr-2" />
                    </motion.div>
                    <h4 className="font-semibold text-white">Business Insights</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                    {state.businessData.insights.map((insight, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-emerald-400/20 backdrop-blur-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02, 
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderColor: "rgba(16, 185, 129, 0.4)"
                        }}
                      >
                        <motion.div 
                          className="flex-shrink-0 w-2 h-2 bg-emerald-400 rounded-full mt-2"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        />
                        <p className="text-sm text-gray-300">{insight}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div 
                key="analytics"
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <TrendChart 
                      businessType={state.businessData.businessType}
                      rating={state.businessData.rating}
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <SEOChart 
                      seoMetrics={state.businessData.seoMetrics}
                      rating={state.businessData.rating}
                    />
                  </motion.div>
                </div>
                
                {/* SEO Metrics */}
                <motion.div 
                  className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-400/30 backdrop-blur-sm relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl"
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      opacity: [0.3, 0.6, 0.3],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />

                  <div className="flex items-center mb-4 relative z-10">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <BarChart3 className="h-6 w-6 text-cyan-400 mr-2" />
                    </motion.div>
                    <h4 className="font-semibold text-white">SEO Performance</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    {[
                      { value: state.businessData.seoMetrics.monthlySearchVolume, label: "Monthly Searches", color: "from-blue-400 to-cyan-400" },
                      { value: state.businessData.seoMetrics.keywordOpportunities, label: "Keyword Opportunities", color: "from-purple-400 to-pink-400" },
                      { value: state.businessData.seoMetrics.onlineVisibility, label: "Online Visibility", color: "from-green-400 to-emerald-400" }
                    ].map((metric, index) => (
                      <motion.div 
                        key={index}
                        className="text-center p-4 bg-white/5 rounded-xl border border-cyan-400/20 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderColor: "rgba(6, 182, 212, 0.4)"
                        }}
                      >
                        <motion.div 
                          className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          {metric.value}
                        </motion.div>
                        <div className="text-sm text-gray-300">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'competition' && (
              <motion.div 
                key="competition"
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <CompetitorChart
                    businessName="Your Business"
                    rating={state.businessData.rating}
                    marketShare={state.businessData.competitorAnalysis.estimatedMarketShare}
                    businessType={state.businessData.businessType}
                  />
                </motion.div>
                
                {/* Competitive Analysis */}
                <motion.div 
                  className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-2xl p-6 border border-rose-400/30 backdrop-blur-sm relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-32 h-32 bg-rose-400/10 rounded-full blur-2xl"
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      opacity: [0.3, 0.6, 0.3],
                      x: [0, 30, 0],
                      y: [0, -20, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />

                  <div className="flex items-center mb-4 relative z-10">
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <Award className="h-6 w-6 text-rose-400 mr-2" />
                    </motion.div>
                    <h4 className="font-semibold text-white">Competitive Analysis</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
                    {[
                      { value: state.businessData.competitorAnalysis.localCompetitors, label: "Local Competitors", color: "from-red-400 to-rose-400" },
                      { value: state.businessData.competitorAnalysis.estimatedMarketShare, label: "Market Share", color: "from-pink-400 to-red-400" },
                      { value: state.businessData.competitorAnalysis.competitiveAdvantage, label: "Key Advantage", color: "from-orange-400 to-pink-400" }
                    ].map((metric, index) => (
                      <motion.div 
                        key={index}
                        className="p-4 bg-white/5 rounded-xl border border-rose-400/20 backdrop-blur-sm"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 30 }}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderColor: "rgba(244, 63, 94, 0.4)"
                        }}
                      >
                        <motion.div 
                          className={`text-lg font-semibold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent mb-1`}
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        >
                          {metric.value}
                        </motion.div>
                        <div className="text-sm text-gray-300">{metric.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div 
                key="activity"
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <HeatmapChart businessType={state.businessData.businessType} />
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      value: state.businessData.rating * 20,
                      max: 100,
                      label: "Customer Satisfaction",
                      color: "#F59E0B",
                      unit: "%"
                    },
                    {
                      value: state.businessData.reviews,
                      max: 500,
                      label: "Review Count",
                      color: "#8B5CF6"
                    },
                    {
                      value: state.businessData.seoMetrics.keywordOpportunities,
                      max: 20,
                      label: "SEO Opportunities",
                      color: "#06B6D4"
                    }
                  ].map((gauge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2, type: "spring", stiffness: 300, damping: 30 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <MetricsGauge {...gauge} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Data Quality Footer */}
          <motion.div 
            className="mt-8 p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Data Quality: {state.businessData.dataFreshness}
                </motion.span>
                <span>•</span>
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  Confidence: {state.businessData.confidenceScore}%
                </motion.span>
              </div>
              <div className="flex items-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                </motion.div>
                <span>Last analyzed {formatLastUpdated(state.businessData.lastUpdated)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BusinessCard;