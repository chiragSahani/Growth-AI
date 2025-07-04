import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Business</h3>
        <p className="text-gray-600 mb-4">Gathering insights and generating SEO content...</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Fetching Google ratings</span>
            <span className="text-green-500">✓</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Analyzing reviews</span>
            <span className="text-green-500">✓</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Generating SEO headline</span>
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          </div>
        </div>
        
        <div className="mt-6 bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;