import React from 'react';

const WeatherList = ({ weatherData }) => {
  return (
    <div className="weather-list">
      <h2>Weather List</h2>
      {weatherData && weatherData.length > 0 ? (
        <div className="row">
          {weatherData.map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Temperature: {item.temp}°C</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default WeatherList;
