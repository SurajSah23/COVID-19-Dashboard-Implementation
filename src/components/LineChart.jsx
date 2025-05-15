import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const LineChart = ({ data }) => {
  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-blue-200 transition-shadow duration-300 ease-in-out">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight border-b pb-2 border-gray-300">
        📈 COVID-19 Timeline
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            labelStyle={{ color: '#374151', fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ paddingTop: 16 }} />
          <Line type="monotone" dataKey="cases" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 3 }} name="Cases" />
          <Line type="monotone" dataKey="deaths" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} name="Deaths" />
          <Line type="monotone" dataKey="recovered" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} name="Recovered" />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
