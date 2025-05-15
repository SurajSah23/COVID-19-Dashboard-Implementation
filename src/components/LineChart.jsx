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
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cases" stroke="#8884d8" name="Cases" dot={false} />
        <Line type="monotone" dataKey="deaths" stroke="#ff0000" name="Deaths" dot={false} />
        <Line type="monotone" dataKey="recovered" stroke="#82ca9d" name="Recovered" dot={false} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
