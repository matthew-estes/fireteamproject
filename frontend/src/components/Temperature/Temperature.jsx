import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Temperature.css";

function Temperature({ latitude, longitude }) {
  const [temperatureData, setTemperatureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTemperature = async () => {
      if (latitude && longitude) {
        try {
          const response = await axios.get(`http://localhost:3000/weather/lat-lng`, {
            params: { lat: latitude, lng: longitude },
          });
          setTemperatureData(response.data);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching temperature data:", err);
          setError(err);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchTemperature();
  }, [latitude, longitude]);

  if (loading) {
    return <div>Loading temperature...</div>;
  }

  if (error) {
    return <div>Error fetching temperature data: {error.message}</div>;
  }

  if (!temperatureData) {
    return <div>Temperature data is not available.</div>;
  }

  const tempInKelvin = temperatureData.main.temp;
  const tempInCelsius = (tempInKelvin - 273.15).toFixed(0);
  const tempInFahrenheit = ((tempInCelsius * 9) / 5 + 32).toFixed(0);

  return (
    <div>
      <div className="temperature">{tempInFahrenheit}°F</div>
      <div className="temp-range">
        <span>
          Low: <strong>{(((temperatureData.main.temp_min - 273.15) * 9) / 5 + 32).toFixed(0)}°F</strong>
        </span>
        <span className="high-temp">
          High: <strong>{(((temperatureData.main.temp_max - 273.15) * 9) / 5 + 32).toFixed(0)}°F</strong>
        </span>
      </div>
    </div>
  );
}

export default Temperature;
