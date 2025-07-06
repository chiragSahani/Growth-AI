import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface RatingChartProps {
  rating: number;
  reviews: number;
}

const RatingChart: React.FC<RatingChartProps> = ({ rating, reviews }) => {
  const data = [
    { name: '5 Stars', value: Math.round(reviews * 0.4), color: '#10B981' },
    { name: '4 Stars', value: Math.round(reviews * 0.3), color: '#84CC16' },
    { name: '3 Stars', value: Math.round(reviews * 0.2), color: '#F59E0B' },
    { name: '2 Stars', value: Math.round(reviews * 0.07), color: '#F97316' },
    { name: '1 Star', value: Math.round(reviews * 0.03), color: '#EF4444' },
  ];

  const COLORS = data.map(item => item.color);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <motion.div 
          className="bg-black/80 backdrop-blur-sm p-3 border border-white/20 rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <p className="font-medium text-white">{data.name}</p>
          <p className="text-sm text-gray-300">{data.value} reviews</p>
          <p className="text-sm text-gray-300">
            {((data.value / reviews) * 100).toFixed(1)}%
          </p>
        </motion.div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated background glow */}
      <motion.div
        className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.h3 
        className="text-lg font-semibold text-white mb-4 relative z-10"
        animate={{ 
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background: "linear-gradient(90deg, #ffffff, #3b82f6, #8b5cf6, #ffffff)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Rating Distribution
      </motion.h3>
      
      <div className="h-64 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <motion.div 
        className="mt-4 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="text-2xl font-bold text-white"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {rating}/5
        </motion.div>
        <div className="text-sm text-gray-300">Average Rating</div>
      </motion.div>
    </motion.div>
  );
};

export default RatingChart;