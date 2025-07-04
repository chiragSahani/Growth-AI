import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface CompetitorChartProps {
  businessName: string;
  rating: number;
  marketShare: string;
  businessType: string;
}

const CompetitorChart: React.FC<CompetitorChartProps> = ({ 
  businessName, 
  rating, 
  marketShare, 
  businessType 
}) => {
  const generateCompetitorData = () => {
    const competitors = [
      { name: businessName, rating, marketShare: parseInt(marketShare), isYou: true },
      { name: 'Competitor A', rating: rating - 0.3, marketShare: parseInt(marketShare) - 5, isYou: false },
      { name: 'Competitor B', rating: rating + 0.1, marketShare: parseInt(marketShare) + 8, isYou: false },
      { name: 'Competitor C', rating: rating - 0.5, marketShare: parseInt(marketShare) - 12, isYou: false },
      { name: 'Competitor D', rating: rating - 0.2, marketShare: parseInt(marketShare) - 3, isYou: false },
    ].map(comp => ({
      ...comp,
      rating: Math.min(5, Math.max(1, comp.rating)),
      marketShare: Math.max(5, comp.marketShare),
    }));

    return competitors.sort((a, b) => b.marketShare - a.marketShare);
  };

  const data = generateCompetitorData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-gray-600">Rating: {data.rating}/5</p>
          <p className="text-sm text-gray-600">Market Share: {data.marketShare}%</p>
          {data.isYou && <p className="text-sm text-blue-600 font-medium">Your Business</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Competitive Analysis</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis stroke="#6B7280" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="marketShare" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isYou ? '#3B82F6' : '#94A3B8'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Your Business</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Competitors</span>
        </div>
      </div>
    </div>
  );
};

export default CompetitorChart;