import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div
      className={`
        p-6 rounded-xl shadow-xl
        bg-opacity-90 backdrop-blur-md
        transition-transform transform hover:scale-105 duration-300 ease-in-out
        ${color} text-white
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-medium text-white/80 mb-1 tracking-wide uppercase">
            {title}
          </h3>
          <p className="text-3xl font-bold tracking-tight">{value.toLocaleString()}</p>
        </div>
        <div className="text-5xl bg-white/20 rounded-full p-3 shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
