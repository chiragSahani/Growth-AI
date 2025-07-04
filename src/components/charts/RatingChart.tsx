import React from 'react';
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
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">{data.value} reviews</p>
          <p className="text-sm text-gray-600">
            {((data.value / reviews) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
      <div className="h-64">
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
      <div className="mt-4 text-center">
        <div className="text-2xl font-bold text-gray-900">{rating}/5</div>
        <div className="text-sm text-gray-600">Average Rating</div>
      </div>
    </div>
  );
};

export default RatingChart;