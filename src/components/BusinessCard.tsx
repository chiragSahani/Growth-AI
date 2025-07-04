import React, { useState } from 'react';
import { Star, Users, Sparkles, RefreshCw, Clock, TrendingUp, Target, Search, BarChart3, Eye, Award, ChevronDown, ChevronUp, Activity, PieChart } from 'lucide-react';
import { useBusinessContext } from '../context/BusinessContext';
import RatingChart from './charts/RatingChart';
import TrendChart from './charts/TrendChart';
import CompetitorChart from './charts/CompetitorChart';
import SEOChart from './charts/SEOChart';
import MetricsGauge from './charts/MetricsGauge';
import HeatmapChart from './charts/HeatmapChart';

const BusinessCard: React.FC = () => {
  const { state, dispatch } = useBusinessContext();
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({ name: '', location: '' });

  if (!state.businessData) return null;

  const handleRegenerateHeadline = async () => {
    dispatch({ type: 'SET_REGENERATING', payload: true });

    try {
      const urlParams = new URLSearchParams({
        name: formData.name || 'Sample Business',
        location: formData.location || 'Sample Location',
      });

      const response = await fetch(`https://growth-ai-1.onrender.com/regenerate-headline?${urlParams}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to regenerate headline'}`);
      }

      const data = await response.json();
      dispatch({ type: 'UPDATE_HEADLINE', payload: data.headline });
    } catch (error) {
      console.error('Regenerate headline error:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to regenerate headline. Please try again.' 
      });
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

  const getBusinessTypeColor = (type: string) => {
    const colors = {
      restaurant: 'from-orange-500 to-red-500',
      retail: 'from-blue-500 to-indigo-500',
      service: 'from-green-500 to-emerald-500',
      healthcare: 'from-red-500 to-pink-500',
      fitness: 'from-purple-500 to-violet-500',
      beauty: 'from-pink-500 to-rose-500',
      automotive: 'from-gray-500 to-slate-500',
      education: 'from-yellow-500 to-amber-500',
      technology: 'from-cyan-500 to-blue-500',
      general: 'from-blue-500 to-purple-500'
    };
    return colors[type as keyof typeof colors] || colors.general;
  };

  const getLocationBadge = (type: string) => {
    const badges = {
      metropolitan: { label: 'Metro Area', color: 'bg-blue-100 text-blue-800' },
      suburban: { label: 'Suburban', color: 'bg-green-100 text-green-800' },
      smallTown: { label: 'Small Town', color: 'bg-purple-100 text-purple-800' }
    };
    return badges[type as keyof typeof badges] || badges.smallTown;
  };

  const businessTypeColor = getBusinessTypeColor(state.businessData.businessType);
  const locationBadge = getLocationBadge(state.businessData.locationType);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'competition', label: 'Competition', icon: Target },
    { id: 'activity', label: 'Activity', icon: Activity },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-7xl">
      {/* Header */}
      <div className={`bg-gradient-to-r ${businessTypeColor} px-6 py-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Business Analytics Dashboard</h3>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${locationBadge.color}`}>
                {locationBadge.label}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20 text-white">
                {state.businessData.businessType.charAt(0).toUpperCase() + state.businessData.businessType.slice(1)}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20 text-white">
                {state.businessData.confidenceScore}% Confidence
              </span>
            </div>
          </div>
          <div className="flex items-center text-white text-sm">
            <Clock className="h-4 w-4 mr-1" />
            <span>Updated {formatLastUpdated(state.businessData.lastUpdated)}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Rating Card */}
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

              {/* Reviews Card */}
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
                  {state.businessData.reviews > 200 ? 'Excellent engagement!' : 
                   state.businessData.reviews > 100 ? 'Great engagement!' : 'Growing audience'}
                </p>
              </div>

              {/* Search Ranking Card */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-3">
                  <Search className="h-6 w-6 text-blue-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">Local Ranking</h4>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">#{state.businessData.seoMetrics.localSearchRanking}</span>
                  <span className="text-lg text-gray-600 ml-1">position</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {state.businessData.seoMetrics.localSearchRanking <= 3 ? 'Top performer!' : 'Room for growth'}
                </p>
              </div>

              {/* Market Share Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center mb-3">
                  <Target className="h-6 w-6 text-purple-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">Market Share</h4>
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">{state.businessData.competitorAnalysis.estimatedMarketShare}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  vs {state.businessData.competitorAnalysis.localCompetitors} competitors
                </p>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RatingChart 
                rating={state.businessData.rating} 
                reviews={state.businessData.reviews} 
              />
              <div className="grid grid-cols-2 gap-4">
                <MetricsGauge
                  value={state.businessData.seoMetrics.monthlySearchVolume}
                  max={2500}
                  label="Monthly Searches"
                  color="#3B82F6"
                />
                <MetricsGauge
                  value={parseInt(state.businessData.seoMetrics.onlineVisibility)}
                  max={100}
                  label="Online Visibility"
                  color="#10B981"
                  unit="%"
                />
              </div>
            </div>

            {/* SEO Headline Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Sparkles className="h-6 w-6 text-indigo-500 mr-2" />
                  <h4 className="font-semibold text-gray-900">AI-Generated SEO Headline</h4>
                </div>
                <button
                  onClick={handleRegenerateHeadline}
                  disabled={state.isRegenerating}
                  className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`h-4 w-4 ${state.isRegenerating ? 'animate-spin' : ''}`} />
                  <span>{state.isRegenerating ? 'Generating...' : 'Regenerate'}</span>
                </button>
              </div>
              
              <div className="relative">
                <p className="text-lg font-medium text-gray-900 leading-relaxed mb-4">
                  {state.businessData.headline}
                </p>
                {state.isRegenerating && (
                  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                    <div className="flex items-center space-x-2 text-indigo-600">
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      <span className="font-medium">Generating new headline...</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg border border-indigo-200">
                  <p className="text-sm text-gray-600">
                    <strong>SEO Score:</strong> Optimized for local search with business name and location targeting.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-indigo-200">
                  <p className="text-sm text-gray-600">
                    <strong>Visibility:</strong> {state.businessData.seoMetrics.onlineVisibility} online presence detected.
                  </p>
                </div>
              </div>
            </div>

            {/* Business Insights */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 text-emerald-500 mr-2" />
                <h4 className="font-semibold text-gray-900">Business Insights</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {state.businessData.insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-emerald-200">
                    <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <p className="text-sm text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrendChart 
                businessType={state.businessData.businessType}
                rating={state.businessData.rating}
              />
              <SEOChart 
                seoMetrics={state.businessData.seoMetrics}
                rating={state.businessData.rating}
              />
            </div>
            
            {/* SEO Metrics */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-6 w-6 text-cyan-500 mr-2" />
                <h4 className="font-semibold text-gray-900">SEO Performance</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-cyan-200">
                  <div className="text-2xl font-bold text-gray-900">{state.businessData.seoMetrics.monthlySearchVolume}</div>
                  <div className="text-sm text-gray-600">Monthly Searches</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-cyan-200">
                  <div className="text-2xl font-bold text-gray-900">{state.businessData.seoMetrics.keywordOpportunities}</div>
                  <div className="text-sm text-gray-600">Keyword Opportunities</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-cyan-200">
                  <div className="text-2xl font-bold text-gray-900">{state.businessData.seoMetrics.onlineVisibility}</div>
                  <div className="text-sm text-gray-600">Online Visibility</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'competition' && (
          <div className="space-y-6">
            <CompetitorChart
              businessName="Your Business"
              rating={state.businessData.rating}
              marketShare={state.businessData.competitorAnalysis.estimatedMarketShare}
              businessType={state.businessData.businessType}
            />
            
            {/* Competitive Analysis */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-200">
              <div className="flex items-center mb-4">
                <Award className="h-6 w-6 text-rose-500 mr-2" />
                <h4 className="font-semibold text-gray-900">Competitive Analysis</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border border-rose-200">
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {state.businessData.competitorAnalysis.localCompetitors}
                  </div>
                  <div className="text-sm text-gray-600">Local Competitors</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-rose-200">
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {state.businessData.competitorAnalysis.estimatedMarketShare}
                  </div>
                  <div className="text-sm text-gray-600">Market Share</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-rose-200">
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    {state.businessData.competitorAnalysis.competitiveAdvantage}
                  </div>
                  <div className="text-sm text-gray-600">Key Advantage</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-6">
            <HeatmapChart businessType={state.businessData.businessType} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricsGauge
                value={state.businessData.rating * 20}
                max={100}
                label="Customer Satisfaction"
                color="#F59E0B"
                unit="%"
              />
              <MetricsGauge
                value={state.businessData.reviews}
                max={500}
                label="Review Count"
                color="#8B5CF6"
              />
              <MetricsGauge
                value={state.businessData.seoMetrics.keywordOpportunities}
                max={20}
                label="SEO Opportunities"
                color="#06B6D4"
              />
            </div>
          </div>
        )}

        {/* Data Quality Footer */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Data Quality: {state.businessData.dataFreshness}</span>
              <span>•</span>
              <span>Confidence: {state.businessData.confidenceScore}%</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              <span>Last analyzed {formatLastUpdated(state.businessData.lastUpdated)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;