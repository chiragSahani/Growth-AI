import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface TrendChartProps {
  businessType: string;
  rating: number;
}

const TrendChart: React.FC<TrendChartProps> = ({ businessType, rating }) => {
  // Generate mock trend data based on business type and current rating
  const generateTrendData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const baseRating = rating - 0.5;
    
    return months.map((month, index) => {
      const variation = (Math.random() - 0.5) * 0.4;
      const trend = index * 0.02; // Slight upward trend
      const monthlyRating = Math.min(5, Math.max(1, baseRating + variation + trend));
      const reviews = Math.floor(Math.random() * 50) + 20;
      
      return {
        month,
        rating: Number(monthlyRating.toFixed(1)),
        reviews,
        searchVolume: Math.floor(Math.random() * 500) + 200,
      };
    });
  };

  const data = generateTrendData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'Rating' && '/5'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="rating"
              stroke="#3B82F6"
              fillOpacity={1}
              fill="url(#colorRating)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="reviews"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorReviews)"
              strokeWidth={2}
              yAxisId="right"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Rating Trend</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Review Volume</span>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;