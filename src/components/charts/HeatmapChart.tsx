import React from 'react';

interface HeatmapChartProps {
  businessType: string;
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ businessType }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];

  const generateHeatmapData = () => {
    const data: number[][] = [];
    
    for (let day = 0; day < 7; day++) {
      const dayData: number[] = [];
      for (let hour = 0; hour < 6; hour++) {
        let intensity = Math.random() * 100;
        
        // Business type specific patterns
        if (businessType === 'restaurant') {
          if (hour >= 4) intensity += 30; // Dinner rush
          if (day >= 5) intensity += 20; // Weekend boost
        } else if (businessType === 'retail') {
          if (day >= 5) intensity += 40; // Weekend shopping
          if (hour >= 2 && hour <= 4) intensity += 20; // Afternoon shopping
        } else if (businessType === 'fitness') {
          if (hour <= 1 || hour >= 4) intensity += 30; // Morning and evening
          if (day <= 4) intensity += 15; // Weekday preference
        }
        
        dayData.push(Math.min(100, intensity));
      }
      data.push(dayData);
    }
    
    return data;
  };

  const data = generateHeatmapData();

  const getIntensityColor = (value: number) => {
    if (value < 20) return 'bg-blue-100';
    if (value < 40) return 'bg-blue-200';
    if (value < 60) return 'bg-blue-300';
    if (value < 80) return 'bg-blue-400';
    return 'bg-blue-500';
  };

  const getTextColor = (value: number) => {
    return value >= 60 ? 'text-white' : 'text-gray-700';
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Activity Heatmap</h3>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-1 min-w-max">
          {/* Header row */}
          <div></div>
          {days.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
              {day}
            </div>
          ))}
          
          {/* Data rows */}
          {hours.map((hour, hourIndex) => (
            <React.Fragment key={hour}>
              <div className="text-sm font-medium text-gray-600 p-2 flex items-center">
                {hour}
              </div>
              {days.map((day, dayIndex) => {
                const value = data[dayIndex][hourIndex];
                return (
                  <div
                    key={`${day}-${hour}`}
                    className={`
                      ${getIntensityColor(value)} 
                      ${getTextColor(value)}
                      p-2 text-center text-xs font-medium rounded transition-all duration-200 hover:scale-105 cursor-pointer
                    `}
                    title={`${day} ${hour}: ${Math.round(value)}% activity`}
                  >
                    {Math.round(value)}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4">
        <span className="text-sm text-gray-600">Low</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map(level => (
            <div
              key={level}
              className={`w-4 h-4 rounded ${getIntensityColor(level * 20)}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">High</span>
      </div>
      
      <div className="mt-2 text-center text-xs text-gray-500">
        Customer activity levels throughout the week
      </div>
    </div>
  );
};

export default HeatmapChart;