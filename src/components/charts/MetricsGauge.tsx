import React from 'react';
import { motion } from 'framer-motion';

interface MetricsGaugeProps {
  value: number;
  max: number;
  label: string;
  color: string;
  unit?: string;
}

const MetricsGauge: React.FC<MetricsGaugeProps> = ({ value, max, label, color, unit = '' }) => {
  const percentage = Math.min(100, (value / max) * 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute top-0 right-0 w-20 h-20 rounded-full blur-xl"
        style={{ backgroundColor: `${color}20` }}
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative inline-flex items-center justify-center">
        <motion.svg 
          className="w-24 h-24 transform -rotate-90" 
          viewBox="0 0 100 100"
          initial={{ rotate: -90 }}
          animate={{ rotate: -90 }}
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 6px ${color}40)`,
            }}
          />
        </motion.svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.div 
              className="text-lg font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 500, damping: 30 }}
            >
              {value}{unit}
            </motion.div>
            <motion.div 
              className="text-xs text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              of {max}{unit}
            </motion.div>
          </div>
        </div>
      </div>
      
      <motion.h4 
        className="mt-4 font-medium text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {label}
      </motion.h4>
      
      <motion.div 
        className="mt-2 text-sm text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        animate-pulse
      >
        {percentage.toFixed(1)}% of target
      </motion.div>
    </motion.div>
  );
};

export default MetricsGauge;