import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, MapPin, Search, AlertCircle, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { useBusinessContext } from '../context/BusinessContext';

const BusinessForm: React.FC = () => {
  const { dispatch } = useBusinessContext();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    location: '',
  });
  const [isHovered, setIsHovered] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: '',
      location: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Business name must be at least 2 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.trim().length < 2) {
      newErrors.location = 'Location must be at least 2 characters';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.location;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetch('https://growth-ai-1.onrender.com/business-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to fetch business data'}`);
      }

      const data = await response.json();
      dispatch({ type: 'SET_BUSINESS_DATA', payload: data });
    } catch (error) {
      console.error('API Error:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch business data. Please try again.' 
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const businessSuggestions = [
    { name: "Mario's Italian Bistro", location: "New York", icon: "🍝" },
    { name: "TechFix Solutions", location: "San Francisco", icon: "💻" },
    { name: "Bloom Beauty Salon", location: "Los Angeles", icon: "💄" },
    { name: "FitCore Gym", location: "Chicago", icon: "💪" },
    { name: "Green Leaf Cafe", location: "Seattle", icon: "☕" },
    { name: "AutoCare Plus", location: "Houston", icon: "🚗" }
  ];

  const handleSuggestionClick = (suggestion: { name: string; location: string }) => {
    setFormData(suggestion);
    setErrors({ name: '', location: '' });
  };

  return (
    <motion.div 
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <motion.div 
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 relative overflow-hidden"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            <Building2 className="h-8 w-8 sm:h-10 sm:w-10 text-white relative z-10" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 opacity-0"
              animate={{ opacity: isHovered ? 0.8 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-white mb-2"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: "linear-gradient(90deg, #ffffff, #a855f7, #ec4899, #ffffff)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Business Analytics
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 text-sm sm:text-base"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Get AI-powered insights for your business
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Name Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
              Business Name
            </label>
            <motion.div 
              className="relative"
              whileFocus={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Building2 className="h-5 w-5 text-gray-400" />
              </motion.div>
              <motion.input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border ${
                  errors.name ? 'border-red-400' : 'border-white/30'
                } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                placeholder="Enter your business name"
                whileFocus={{ 
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                  borderColor: "#3B82F6"
                }}
              />
            </motion.div>
            <AnimatePresence>
              {errors.name && (
                <motion.div
                  className="flex items-center mt-2 text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{errors.name}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Location Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="location" className="block text-sm font-medium text-gray-200 mb-2">
              Location
            </label>
            <motion.div 
              className="relative"
              whileFocus={{ scale: 1.02 }}
            >
              <motion.div
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                animate={{ y: [0, -2, 2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="h-5 w-5 text-gray-400" />
              </motion.div>
              <motion.input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border ${
                  errors.location ? 'border-red-400' : 'border-white/30'
                } rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                placeholder="Enter your city"
                whileFocus={{ 
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                  borderColor: "#3B82F6"
                }}
              />
            </motion.div>
            <AnimatePresence>
              {errors.location && (
                <motion.div
                  className="flex items-center mt-2 text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{errors.location}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 sm:py-4 px-6 rounded-xl font-medium transition-all duration-300 group"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div 
              className="relative z-10 flex items-center justify-center space-x-2"
              animate={{ x: [0, 2, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Search className="h-5 w-5" />
              <span className="text-base sm:text-lg">Analyze Business</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="h-4 w-4" />
              </motion.div>
            </motion.div>
          </motion.button>
        </form>

        {/* Sample Business Suggestions */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="flex items-center mb-4"
            animate={{ x: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="h-4 w-4 text-purple-400 mr-2" />
            <h3 className="text-sm font-medium text-gray-200">Try these examples:</h3>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {businessSuggestions.slice(0, 6).map((suggestion, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-left p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 hover:bg-white/10 transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(147, 51, 234, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.span 
                      className="text-lg"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {suggestion.icon}
                    </motion.span>
                    <div>
                      <div className="font-medium text-white group-hover:text-purple-300 transition-colors text-sm">
                        {suggestion.name}
                      </div>
                      <div className="text-xs text-gray-400 group-hover:text-purple-400 transition-colors">
                        {suggestion.location}
                      </div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <Search className="h-4 w-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
                  </motion.div>
                </div>
              </motion.button>
            ))}
          </div>
          
          <motion.div 
            className="mt-4 text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-xs text-gray-400">
              Click any example to auto-fill the form
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default BusinessForm;