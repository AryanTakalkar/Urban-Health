import React from 'react';

const Legend = () => {
  const levels = [
    { range: '0-50', color: '#00e400', label: 'Good' },
    { range: '51-100', color: '#ffff00', label: 'Moderate' },
    { range: '101-150', color: '#ff7e00', label: 'Unhealthy for Sensitive Groups' },
    { range: '151-200', color: '#ff0000', label: 'Unhealthy' },
    { range: '201-300', color: '#99004c', label: 'Very Unhealthy' },
    { range: '300+', color: '#7e0023', label: 'Hazardous' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-2">AQI Legend</h3>
      <div className="grid gap-2">
        {levels.map((level) => (
          <div key={level.range} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded"
              style={{ backgroundColor: level.color }}
            />
            <span className="text-sm">
              {level.range} - {level.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;