import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeartbeat, FaSearch, FaCalendarAlt, FaUserMinus, FaChartLine } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import StatCard from './components/StatCard';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import { format } from 'date-fns';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('usa');
  const [covidData, setCovidData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(new Date(2022, 9, 24));
  const [endDate, setEndDate] = useState(new Date(2023, 11, 12));

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
    return Object.keys(cases).map(date => ({
      date,
      cases: cases[date] / 1000000,
      deaths: deaths[date] / 1000000,
      recovered: recovered[date] / 1000000,
    }));
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = getLatestStats();
  const selectedCountryData = countries.find(c => c.cca3.toLowerCase() === selectedCountry);
  const population = selectedCountryData?.population || 0;

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">COVID-19 and Population Dashboard</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow md:w-64">
              <input
                type="text"
                placeholder="Search Country"
                className="pl-10 pr-4 py-2 border rounded-md w-full bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              className="p-2 border rounded-md w-full md:w-auto bg-white"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {filteredCountries.map((country) => (
                <option key={country.cca3} value={country.cca3.toLowerCase()}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white rounded-md border p-2">
            <FaCalendarAlt className="h-5 w-5 text-gray-400" />
            <div className="flex gap-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date || new Date())}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="border-0 focus:ring-0"
                dateFormat="dd-MM-yyyy"
              />
              <span>-</span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date || new Date())}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="border-0 focus:ring-0"
                dateFormat="dd-MM-yyyy"
              />
            </div>
          </div>
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
                icon={<FaChartLine />}
                color="bg-blue-100"
                textColor="text-blue-600"
                growth="0.02%"
              />
              <StatCard
                title="Recoveries"
                value={stats.recovered}
                icon={<FaHeartbeat />}
                color="bg-green-100"
                textColor="text-green-600"
                growth="0.02%"
              />
              <StatCard
                title="Deaths"
                value={stats.deaths}
                icon={<FaUserMinus />}
                color="bg-red-100"
                textColor="text-red-600"
                growth="0.02%"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Line Chart</h2>
                <LineChart data={prepareChartData()} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Pie Chart</h2>
                <PieChart
                  data={[
                    { name: 'Total Population', value: population },
                    { name: 'Cases', value: stats.cases },
                    { name: 'Deaths', value: stats.deaths },
                    { name: 'Recovered', value: stats.recovered },
                  ]}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;