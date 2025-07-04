import React from 'react';
import { BusinessProvider, useBusinessContext } from './context/BusinessContext';
import BusinessForm from './components/BusinessForm';
import BusinessCard from './components/BusinessCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const DashboardContent: React.FC = () => {
  const { state, dispatch } = useBusinessContext();

  const handleRetry = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GrowthPro
            </span>
            <span className="text-gray-900">AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your business potential with AI-powered insights and SEO optimization
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center space-y-8">
          {state.error && (
            <ErrorMessage message={state.error} onRetry={handleRetry} />
          )}
          
          {state.isLoading && <LoadingSpinner />}
          
          {!state.businessData && !state.isLoading && !state.error && (
            <BusinessForm />
          )}
          
          {state.businessData && !state.isLoading && (
            <div className="space-y-8">
              <BusinessCard />
              <div className="text-center">
                <button
                  onClick={() => dispatch({ type: 'SET_BUSINESS_DATA', payload: null })}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Search Another Business
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500">
          <p>&copy; 2025 GrowthProAI. Empowering businesses with AI-driven insights.</p>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BusinessProvider>
      <DashboardContent />
    </BusinessProvider>
  );
};

export default App;