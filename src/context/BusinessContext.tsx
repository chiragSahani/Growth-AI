import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface BusinessData {
  rating: number;
  reviews: number;
  headline: string;
  lastUpdated: string;
}

interface BusinessState {
  businessData: BusinessData | null;
  isLoading: boolean;
  error: string | null;
  isRegenerating: boolean;
}

type BusinessAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_BUSINESS_DATA'; payload: BusinessData }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_REGENERATING'; payload: boolean }
  | { type: 'UPDATE_HEADLINE'; payload: string };

const initialState: BusinessState = {
  businessData: null,
  isLoading: false,
  error: null,
  isRegenerating: false,
};

const businessReducer = (state: BusinessState, action: BusinessAction): BusinessState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_BUSINESS_DATA':
      return { ...state, businessData: action.payload, isLoading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_REGENERATING':
      return { ...state, isRegenerating: action.payload };
    case 'UPDATE_HEADLINE':
      return {
        ...state,
        businessData: state.businessData 
          ? { ...state.businessData, headline: action.payload }
          : null,
        isRegenerating: false,
      };
    default:
      return state;
  }
};

const BusinessContext = createContext<{
  state: BusinessState;
  dispatch: React.Dispatch<BusinessAction>;
} | null>(null);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(businessReducer, initialState);

  return (
    <BusinessContext.Provider value={{ state, dispatch }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessContext = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
};