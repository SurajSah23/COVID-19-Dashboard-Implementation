import React from 'react';

const StatCard = ({ title, value, icon, color, textColor, growth }) => {
  const formattedValue = (value / 1000000).toFixed(1) + 'M';

  return (
    <div className={`p-6 rounded-lg ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-600 font-medium mb-2">{title}</h3>
          <p className={`text-2xl font-bold ${textColor}`}>{formattedValue}</p>
          <p className="text-sm text-gray-500 mt-1">Growth {growth}</p>
        </div>
        <div className={`${textColor} opacity-80`}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
