import React from 'react';
import { motion } from 'framer-motion';
import { BusinessProvider, useBusinessContext } from './context/BusinessContext';
import BusinessForm from './components/BusinessForm';
import BusinessCard from './components/BusinessCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ParticleBackground from './components/ParticleBackground';
import FloatingElements from './components/FloatingElements';

const DashboardContent: React.FC = () => {
  const { state, dispatch } = useBusinessContext();

  const handleRetry = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <ParticleBackground />
      <FloatingElements />
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
            "linear-gradient(90deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
            "linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
            "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{
              background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <motion.span
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block" }}
            >
              GrowthPro
            </motion.span>
            <motion.span 
              className="text-white ml-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Discover your business potential with{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI-powered insights
            </motion.span>
            {' '}and{' '}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              SEO optimization
            </motion.span>
          </motion.p>

          {/* Floating stats */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            {[
              { label: "Businesses Analyzed", value: "10K+", color: "from-blue-400 to-cyan-400" },
              { label: "AI Insights Generated", value: "50K+", color: "from-purple-400 to-pink-400" },
              { label: "Success Rate", value: "98%", color: "from-green-400 to-emerald-400" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                <motion.div 
                  className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="flex flex-col items-center justify-center space-y-8"
          layout
        >
          {state.error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ErrorMessage message={state.error} onRetry={handleRetry} />
            </motion.div>
          )}
          
          {state.isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <LoadingSpinner />
            </motion.div>
          )}
          
          {!state.businessData && !state.isLoading && !state.error && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <BusinessForm />
            </motion.div>
          )}
          
          {state.businessData && !state.isLoading && (
            <motion.div 
              className="space-y-8 w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <BusinessCard />
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.button
                  onClick={() => dispatch({ type: 'SET_BUSINESS_DATA', payload: null })}
                  className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25"
                  whileHover={{ 
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                    y: -2
                  }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Search Another Business</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="mt-16 text-center text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            &copy; 2025 GrowthProAI. Empowering businesses with AI-driven insights.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BusinessProvider>
      <DashboardContent />
    </BusinessProvider>
  );
};

export default App;