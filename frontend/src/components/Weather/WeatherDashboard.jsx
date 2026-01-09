import React, { useState, useEffect, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import Loading from '../Layout/Loading';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('rank');
  const [filterText, setFilterText] = useState('');
  const { getAccessTokenSilently } = useAuth0();

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getAccessTokenSilently();
      
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/weather`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setWeatherData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const getSortedData = () => {
    let sorted = [...weatherData];

    // Filter
    if (filterText) {
      sorted = sorted.filter(city =>
        city.name.toLowerCase().includes(filterText.toLowerCase()) ||
        city.country.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'rank':
        sorted.sort((a, b) => a.rank - b.rank);
        break;
      case 'temperature':
        sorted.sort((a, b) => b.temperature.current - a.temperature.current);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return sorted;
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <button
          onClick={fetchWeatherData}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const sortedData = getSortedData();

  return (
    <div>
      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Cities
            </label>
            <input
              type="text"
              placeholder="Search by city or country..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="rank">Comfort Rank</option>
              <option value="temperature">Temperature</option>
              <option value="name">City Name</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchWeatherData}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Refresh Data
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Showing {sortedData.length} of {weatherData.length} cities
          {weatherData.some(city => city.fromCache) && (
            <span className="ml-2 text-green-600 dark:text-green-400">
              • Using cached data
            </span>
          )}
        </div>
      </div>

      {/* Top 3 Podium */}
      {sortBy === 'rank' && !filterText && sortedData.length >= 3 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            Top 3 Most Comfortable Cities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* 2nd Place */}
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg p-4 text-center transform md:translate-y-8">
                <div className="text-4xl mb-2">🥈</div>
                <WeatherCard city={sortedData[1]} highlight />
              </div>
            </div>

            {/* 1st Place */}
            <div className="order-1 md:order-2">
              <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg p-4 text-center">
                <div className="text-5xl mb-2">🥇</div>
                <WeatherCard city={sortedData[0]} highlight />
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 md:order-3">
              <div className="bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg p-4 text-center transform md:translate-y-16">
                <div className="text-4xl mb-2">🥉</div>
                <WeatherCard city={sortedData[2]} highlight />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weather Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedData.map((city) => (
          <WeatherCard key={city.cityId} city={city} />
        ))}
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No cities match your search criteria
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;