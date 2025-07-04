import React, { useState } from 'react';
import { Building2, MapPin, Search, AlertCircle, Sparkles } from 'lucide-react';
import { useBusinessContext } from '../context/BusinessContext';

const BusinessForm: React.FC = () => {
  const { dispatch } = useBusinessContext();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    location: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      location: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Business name must be at least 2 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.trim().length < 2) {
      newErrors.location = 'Location must be at least 2 characters';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.location;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetch('https://growth-ai-1.onrender.com/business-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || 'Failed to fetch business data'}`);
      }

      const data = await response.json();
      dispatch({ type: 'SET_BUSINESS_DATA', payload: data });
    } catch (error) {
      console.error('API Error:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to fetch business data. Please try again.' 
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Sample business suggestions for demonstration
  const businessSuggestions = [
    { name: "Mario's Italian Bistro", location: "New York" },
    { name: "TechFix Solutions", location: "San Francisco" },
    { name: "Bloom Beauty Salon", location: "Los Angeles" },
    { name: "FitCore Gym", location: "Chicago" },
    { name: "Green Leaf Cafe", location: "Seattle" },
    { name: "AutoCare Plus", location: "Houston" }
  ];

  const handleSuggestionClick = (suggestion: { name: string; location: string }) => {
    setFormData(suggestion);
    setErrors({ name: '', location: '' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Analytics</h2>
        <p className="text-gray-600">Get AI-powered insights for your business</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter your business name"
            />
          </div>
          {errors.name && (
            <div className="flex items-center mt-2 text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">{errors.name}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border ${
                errors.location ? 'border-red-300' : 'border-gray-300'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="Enter your city"
            />
          </div>
          {errors.location && (
            <div className="flex items-center mt-2 text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">{errors.location}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Analyze Business</span>
        </button>
      </form>

      {/* Sample Business Suggestions */}
      <div className="mt-8">
        <div className="flex items-center mb-4">
          <Sparkles className="h-4 w-4 text-purple-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Try these examples:</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {businessSuggestions.slice(0, 3).map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-purple-700">
                    {suggestion.name}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-purple-600">
                    {suggestion.location}
                  </div>
                </div>
                <Search className="h-4 w-4 text-gray-400 group-hover:text-purple-500" />
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Click any example to auto-fill the form
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessForm;