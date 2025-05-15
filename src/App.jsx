import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaVirus, FaSkullCrossbones, FaHeartbeat } from 'react-icons/fa'; // react-icons instead of lucide-react
import StatCard from './components/StatCard';
import LineChart from './components/LineChart';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [covidData, setCovidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (err) {
        setError('Failed to fetch countries');
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCovidData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://disease.sh/v3/covid-19/historical/${selectedCountry}?lastdays=1500`);
        setCovidData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch COVID-19 data');
      } finally {
        setLoading(false);
      }
    };

    fetchCovidData();
  }, [selectedCountry]);

  const getLatestStats = () => {
    if (!covidData) return { cases: 0, deaths: 0, recovered: 0 };

    const timeline = covidData.timeline;
    const latestDate = Object.keys(timeline.cases).pop() || '';

    return {
      cases: timeline.cases[latestDate] || 0,
      deaths: timeline.deaths[latestDate] || 0,
      recovered: timeline.recovered[latestDate] || 0,
    };
  };

  const prepareChartData = () => {
    if (!covidData) return [];

    const { cases, deaths, recovered } = covidData.timeline;
    return Object.keys(cases).map((date) => ({
      date,
      cases: cases[date],
      deaths: deaths[date],
      recovered: recovered[date],
    }));
  };

  const stats = getLatestStats();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">COVID-19 Dashboard</h1>
          <select
            className="p-2 border rounded-md"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country) => (
              <option key={country.cca3} value={country.cca3.toLowerCase()}>
                {country.name.common}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Cases"
                value={stats.cases}
                icon={<FaVirus />}
                color="bg-blue-500"
              />
              <StatCard
                title="Deaths"
                value={stats.deaths}
                icon={<FaSkullCrossbones />}
                color="bg-red-500"
              />
              <StatCard
                title="Recovered"
                value={stats.recovered}
                icon={<FaHeartbeat />}
                color="bg-green-500"
              />
            </div>

            <LineChart data={prepareChartData()} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
