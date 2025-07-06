import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Target, Zap, Sparkles, BarChart3 } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const icons = [Star, TrendingUp, Target, Zap, Sparkles, BarChart3];
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 2 }}>
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0.1,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Icon 
            className="w-8 h-8 text-white/20" 
            style={{
              filter: 'blur(1px)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;