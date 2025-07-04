import React from 'react';

interface MetricsGaugeProps {
  value: number;
  max: number;
  label: string;
  color: string;
  unit?: string;
}

const MetricsGauge: React.FC<MetricsGaugeProps> = ({ value, max, label, color, unit = '' }) => {
  const percentage = Math.min(100, (value / max) * 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
      <div className="relative inline-flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#E5E7EB"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {value}{unit}
            </div>
            <div className="text-xs text-gray-500">
              of {max}{unit}
            </div>
          </div>
        </div>
      </div>
      <h4 className="mt-4 font-medium text-gray-900">{label}</h4>
      <div className="mt-2 text-sm text-gray-600">
        {percentage.toFixed(1)}% of target
      </div>
    </div>
  );
};

export default MetricsGauge;