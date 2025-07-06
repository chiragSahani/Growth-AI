import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Zap } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <motion.div 
      className="relative w-full max-w-lg mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-3xl blur-xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <motion.div 
        className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20"
        animate={{ 
          boxShadow: [
            "0 25px 50px rgba(0, 0, 0, 0.25)",
            "0 25px 50px rgba(239, 68, 68, 0.25)",
            "0 25px 50px rgba(0, 0, 0, 0.25)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="text-center">
          {/* Error Icon */}
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mb-6 relative overflow-hidden"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity },
              scale: { duration: 1.5, repeat: Infinity }
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-400"
              animate={{ 
                opacity: [0.5, 1, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <AlertTriangle className="h-10 w-10 text-white relative z-10" />
            
            {/* Warning particles */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                animate={{
                  x: [0, Math.cos(i * 90 * Math.PI / 180) * 25],
                  y: [0, Math.sin(i * 90 * Math.PI / 180) * 25],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 1.5,
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
            className="text-2xl font-semibold text-white mb-2"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background: "linear-gradient(90deg, #ffffff, #f97316, #ef4444, #ffffff)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Something went wrong
          </motion.h3>
          
          {/* Error Message */}
          <motion.p 
            className="text-gray-300 mb-8 leading-relaxed"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>
          
          {/* Retry Button */}
          {onRetry && (
            <motion.button
              onClick={onRetry}
              className="relative overflow-hidden bg-gradient-to-r from-red-500 to-orange-500 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                <RefreshCw className="h-5 w-5" />
                <span>Try Again</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="h-4 w-4" />
                </motion.div>
              </motion.div>
            </motion.button>
          )}

          {/* Floating error indicators */}
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ErrorMessage;