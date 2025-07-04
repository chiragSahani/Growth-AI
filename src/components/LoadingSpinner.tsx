import React from 'react';
import { Loader2, Star, Users, Search, TrendingUp, Target, BarChart3 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  const analysisSteps = [
    { icon: Star, label: 'Fetching Google ratings', status: 'complete' },
    { icon: Users, label: 'Analyzing customer reviews', status: 'complete' },
    { icon: Search, label: 'Checking local search rankings', status: 'complete' },
    { icon: TrendingUp, label: 'Generating business insights', status: 'loading' },
    { icon: Target, label: 'Analyzing market competition', status: 'pending' },
    { icon: BarChart3, label: 'Creating SEO recommendations', status: 'pending' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Analyzing Your Business</h3>
        <p className="text-gray-600 mb-6">Our AI is gathering comprehensive insights and generating personalized recommendations...</p>
        
        <div className="space-y-4 mb-6">
          {analysisSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-4 w-4 ${
                    step.status === 'complete' ? 'text-green-500' :
                    step.status === 'loading' ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                  <span className={`${
                    step.status === 'complete' ? 'text-gray-700' :
                    step.status === 'loading' ? 'text-blue-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                <div className="flex items-center">
                  {step.status === 'complete' && (
                    <span className="text-green-500 font-medium">✓</span>
                  )}
                  {step.status === 'loading' && (
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  )}
                  {step.status === 'pending' && (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="space-y-3">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-2000 w-3/4 animate-pulse"></div>
          </div>
          <p className="text-xs text-gray-500">
            Processing business data and market analysis...
          </p>
        </div>

        {/* Enhanced loading indicators */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">4.2★</div>
            <div className="text-xs text-gray-600">Avg Rating</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">127</div>
            <div className="text-xs text-gray-600">Reviews</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">#3</div>
            <div className="text-xs text-gray-600">Local Rank</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;