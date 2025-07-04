import React from 'react';
import { Star, Users, Sparkles, RefreshCw, Clock } from 'lucide-react';
import { useBusinessContext } from '../context/BusinessContext';

const BusinessCard: React.FC = () => {
  const { state, dispatch } = useBusinessContext();

  if (!state.businessData) return null;

  const handleRegenerateHeadline = async () => {
    dispatch({ type: 'SET_REGENERATING', payload: true });

    try {
      const urlParams = new URLSearchParams({
        name: 'Sample Business', // In a real app, you'd store the original form data
        location: 'Sample Location',
      });

      const response = await fetch(`https://growth-ai-25pq.onrender.com/regenerate-headline?${urlParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to regenerate headline');
      }

      const data = await response.json();
      dispatch({ type: 'UPDATE_HEADLINE', payload: data.headline });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to regenerate headline. Please try again.' });
    }
  };

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Business Overview</h3>
          <div className="flex items-center text-white text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>Updated {formatLastUpdated(state.businessData.lastUpdated)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Rating and Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center mb-3">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <h4 className="font-semibold text-gray-900">Google Rating</h4>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">{state.businessData.rating}</span>
              <span className="text-lg text-gray-600 ml-1">/5</span>
            </div>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(state.businessData.rating)
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div className="flex items-center mb-3">
              <Users className="h-6 w-6 text-green-500 mr-2" />
              <h4 className="font-semibold text-gray-900">Reviews</h4>
            </div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">{state.businessData.reviews}</span>
              <span className="text-lg text-gray-600 ml-1">total</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {state.businessData.reviews > 100 ? 'Great engagement!' : 'Growing audience'}
            </p>
          </div>
        </div>

        {/* SEO Headline */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-purple-500 mr-2" />
              <h4 className="font-semibold text-gray-900">AI-Generated SEO Headline</h4>
            </div>
            <button
              onClick={handleRegenerateHeadline}
              disabled={state.isRegenerating}
              className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`h-4 w-4 ${state.isRegenerating ? 'animate-spin' : ''}`} />
              <span>{state.isRegenerating ? 'Generating...' : 'Regenerate'}</span>
            </button>
          </div>
          
          <div className="relative">
            <p className="text-lg font-medium text-gray-900 leading-relaxed">
              {state.businessData.headline}
            </p>
            {state.isRegenerating && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="flex items-center space-x-2 text-purple-600">
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  <span className="font-medium">Generating new headline...</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
            <p className="text-sm text-gray-600">
              <strong>SEO Tip:</strong> This headline is optimized for search engines and social media sharing. 
              It includes your business name and location for better local SEO.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;