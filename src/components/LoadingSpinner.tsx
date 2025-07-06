import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Star, Users, Search, TrendingUp, Target, BarChart3, Zap, Brain, Sparkles } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  const analysisSteps = [
    { icon: Star, label: 'Fetching Google ratings', status: 'complete', color: 'text-yellow-500' },
    { icon: Users, label: 'Analyzing customer reviews', status: 'complete', color: 'text-green-500' },
    { icon: Search, label: 'Checking local search rankings', status: 'complete', color: 'text-blue-500' },
    { icon: TrendingUp, label: 'Generating business insights', status: 'loading', color: 'text-purple-500' },
    { icon: Target, label: 'Analyzing market competition', status: 'pending', color: 'text-pink-500' },
    { icon: BarChart3, label: 'Creating SEO recommendations', status: 'pending', color: 'text-cyan-500' }
  ];

  return (
    <motion.div 
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div 
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20"
        animate={{ 
          boxShadow: [
            "0 25px 50px rgba(0, 0, 0, 0.25)",
            "0 25px 50px rgba(147, 51, 234, 0.25)",
            "0 25px 50px rgba(59, 130, 246, 0.25)",
            "0 25px 50px rgba(0, 0, 0, 0.25)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="text-center">
          {/* Main Loading Icon */}
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 relative overflow-hidden"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
              scale: { duration: 1.5, repeat: Infinity }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-400"
              animate={{ 
                rotate: [-360, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <Brain className="h-10 w-10 text-white relative z-10" />
            
            {/* Floating particles around the icon */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                animate={{
                  x: [0, Math.cos(i * 60 * Math.PI / 180) * 30],
                  y: [0, Math.sin(i * 60 * Math.PI / 180) * 30],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="text-2xl sm:text-3xl font-semibold text-white mb-2"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: "linear-gradient(90deg, #ffffff, #a855f7, #06b6d4, #ffffff)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Analyzing Your Business
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 mb-8 text-sm sm:text-base"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Our AI is gathering comprehensive insights and generating personalized recommendations...
          </motion.p>
          
          {/* Analysis Steps */}
          <div className="space-y-4 mb-8">
            <AnimatePresence>
              {analysisSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="flex items-center justify-between text-sm bg-white/5 rounded-xl p-4 backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <div className="flex items-center space-x-3">
                      <motion.div
                        animate={step.status === 'loading' ? { 
                          rotate: 360,
                          scale: [1, 1.2, 1]
                        } : {}}
                        transition={step.status === 'loading' ? { 
                          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                          scale: { duration: 1, repeat: Infinity }
                        } : {}}
                      >
                        <Icon className={`h-5 w-5 ${step.color}`} />
                      </motion.div>
                      <span className={`${
                        step.status === 'complete' ? 'text-gray-300' :
                        step.status === 'loading' ? 'text-white font-medium' : 'text-gray-500'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {step.status === 'complete' && (
                        <motion.span 
                          className="text-green-400 font-medium text-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          ✓
                        </motion.span>
                      )}
                      {step.status === 'loading' && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Loader2 className="h-5 w-5 text-blue-400" />
                        </motion.div>
                      )}
                      {step.status === 'pending' && (
                        <motion.div 
                          className="w-5 h-5 rounded-full border-2 border-gray-500"
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-white/20">
              <motion.div 
                className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: "75%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
            </div>
            <motion.p 
              className="text-xs text-gray-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Processing business data and market analysis...
            </motion.p>
          </div>

          {/* Enhanced loading indicators */}
          <motion.div 
            className="mt-8 grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              { value: "4.2★", label: "Avg Rating", color: "from-yellow-400 to-orange-400" },
              { value: "127", label: "Reviews", color: "from-green-400 to-emerald-400" },
              { value: "#3", label: "Local Rank", color: "from-purple-400 to-pink-400" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.3 
                }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  style={{ backgroundSize: "200% 100%" }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Floating AI indicators */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
            >
              <Sparkles className="h-6 w-6 text-purple-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;