import React from 'react';
import './HourlyForecast.css';

function HourlyForecast() {

    const forecastData = [
        { time: "Now", icon: "ICON", temp: "00" },
        { time: "1PM", icon: "ICON", temp: "00" },
        { time: "2PM", icon: "ICON", temp: "00" },
        { time: "3PM", icon: "ICON", temp: "00" },
        { time: "4PM", icon: "ICON", temp: "00" },
      ];

  return (
    <div className="hourly-forecast">
      <h3>Hourly Forecast</h3>
      <div className="hourly-grid">
        {forecastData.map((hour, index) => (
          <div className="hour" key={index}>
            <p>{hour.time}</p>
            <p>{hour.icon}</p>
            <p>{hour.temp}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;