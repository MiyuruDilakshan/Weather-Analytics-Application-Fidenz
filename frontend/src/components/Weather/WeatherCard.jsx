import React from 'react';

const WeatherCard = ({ city, highlight = false }) => {
  const getComfortLevel = (score) => {
    if (score >= 80) return { text: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { text: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 40) return { text: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Poor', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const comfort = getComfortLevel(city.comfortIndex);
  const iconUrl = `https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 ${highlight ? 'ring-2 ring-indigo-500' : ''}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{city.name}</h3>
            <p className="text-sm opacity-90">{city.country}</p>
          </div>
          <div className="text-right">
            <div className="bg-white text-indigo-600 rounded-full px-3 py-1 text-sm font-bold">
              Rank #{city.rank}
            </div>
          </div>
        </div>
      </div>

      {/* Weather Icon and Temp */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={iconUrl} alt={city.weather.description} className="w-20 h-20" />
            <div>
              <div className="text-4xl font-bold text-gray-800 dark:text-white">
                {city.temperature.current}°C
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {city.weather.description}
              </div>
            </div>
          </div>
        </div>

        {/* Comfort Index */}
        <div className={`${comfort.bg} rounded-lg p-4 mb-4`}>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Comfort Index</span>
            <span className={`text-2xl font-bold ${comfort.color}`}>
              {city.comfortIndex}
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${comfort.color.replace('text', 'bg')}`}
                style={{ width: `${city.comfortIndex}%` }}
              ></div>
            </div>
          </div>
          <div className={`text-xs font-semibold mt-2 ${comfort.color}`}>
            {comfort.text}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
            <div className="text-gray-600 dark:text-gray-400">Feels Like</div>
            <div className="font-semibold text-gray-800 dark:text-white">
              {city.temperature.feelsLike}°C
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
            <div className="text-gray-600 dark:text-gray-400">Humidity</div>
            <div className="font-semibold text-gray-800 dark:text-white">
              {city.humidity}%
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
            <div className="text-gray-600 dark:text-gray-400">Wind</div>
            <div className="font-semibold text-gray-800 dark:text-white">
              {city.wind.speed} m/s
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
            <div className="text-gray-600 dark:text-gray-400">Visibility</div>
            <div className="font-semibold text-gray-800 dark:text-white">
              {(city.visibility / 1000).toFixed(1)} km
            </div>
          </div>
        </div>

        {/* Comfort Breakdown */}
        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800">
            View Comfort Score Breakdown
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Temperature Score:</span>
              <span className="font-semibold">{city.comfortBreakdown.temperature}</span>
            </div>
            <div className="flex justify-between">
              <span>Humidity Score:</span>
              <span className="font-semibold">{city.comfortBreakdown.humidity}</span>
            </div>
            <div className="flex justify-between">
              <span>Wind Score:</span>
              <span className="font-semibold">{city.comfortBreakdown.wind}</span>
            </div>
            <div className="flex justify-between">
              <span>Visibility Score:</span>
              <span className="font-semibold">{city.comfortBreakdown.visibility}</span>
            </div>
          </div>
        </details>

        {city.fromCache && (
          <div className="mt-3 text-xs text-green-600 dark:text-green-400 flex items-center">
            <span className="mr-1">✓</span> Cached data
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;