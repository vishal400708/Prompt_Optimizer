import React from 'react';

const Chart: React.FC = () => {
  const data = [
    { day: 'Mon', value: 85 },
    { day: 'Tue', value: 92 },
    { day: 'Wed', value: 88 },
    { day: 'Thu', value: 95 },
    { day: 'Fri', value: 91 },
    { day: 'Sat', value: 97 },
    { day: 'Sun', value: 94 }
  ];

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-end space-x-2 h-48">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center space-y-2">
            <div className="w-full bg-gray-100 rounded-t relative h-full flex items-end">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-500 ease-out"
                style={{ height: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-600 font-medium">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-600">
        Last 7 days optimization success rate
      </div>
    </div>
  );
};

export default Chart;