import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';

interface SEOChartProps {
  seoMetrics: {
    localSearchRanking: number;
    monthlySearchVolume: number;
    keywordOpportunities: number;
    onlineVisibility: string;
  };
  rating: number;
}

const SEOChart: React.FC<SEOChartProps> = ({ seoMetrics, rating }) => {
  const data = [
    {
      metric: 'Local Ranking',
      score: Math.max(0, 100 - (seoMetrics.localSearchRanking - 1) * 20),
      fullMark: 100,
    },
    {
      metric: 'Search Volume',
      score: Math.min(100, (seoMetrics.monthlySearchVolume / 2500) * 100),
      fullMark: 100,
    },
    {
      metric: 'Online Visibility',
      score: parseInt(seoMetrics.onlineVisibility),
      fullMark: 100,
    },
    {
      metric: 'Customer Rating',
      score: (rating / 5) * 100,
      fullMark: 100,
    },
    {
      metric: 'Keyword Opportunities',
      score: Math.min(100, (seoMetrics.keywordOpportunities / 20) * 100),
      fullMark: 100,
    },
    {
      metric: 'Content Quality',
      score: 70 + Math.random() * 25, // Mock score
      fullMark: 100,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.payload.metric}</p>
          <p className="text-sm text-gray-600">Score: {Math.round(data.value)}/100</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Performance Radar</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#E5E7EB" />
            <PolarAngleAxis 
              dataKey="metric" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: '#6B7280' }}
            />
            <Radar
              name="SEO Score"
              dataKey="score"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">
            {Math.round(data.reduce((sum, item) => sum + item.score, 0) / data.length)}
          </div>
          <div className="text-xs text-gray-600">Overall SEO Score</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">
            #{seoMetrics.localSearchRanking}
          </div>
          <div className="text-xs text-gray-600">Local Search Rank</div>
        </div>
      </div>
    </div>
  );
};

export default SEOChart;