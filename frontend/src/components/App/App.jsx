import { useState } from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import "./App.css";

function App() {
  return (
    <div className="mobile-view">
      <div className="weather-card">
        <div className="location-info">
          <h1>My Location</h1>
          <p>Los Angeles</p>
        </div>
        <div className="temperature">
          <span>00°</span>
        </div>
        <div className="temp-range">
          <p>Low: 00° | High: 00°</p>
        </div>
      </div>

      <div className="hourly-forecast">
        <h3>Hourly Forecast</h3>
        <div className="hourly-grid">
          <div className="hour">
            <p>Now</p>
            <p>ICON</p>
            <p>00°</p>
          </div>
          <div className="hour">
            <p>1PM</p>
            <p>ICON</p>
            <p>00°</p>
          </div>
          <div className="hour">
            <p>2PM</p>
            <p>ICON</p>
            <p>00°</p>
          </div>
          <div className="hour">
            <p>3PM</p>
            <p>ICON</p>
            <p>00°</p>
          </div>
          <div className="hour">
            <p>4PM</p>
            <p>ICON</p>
            <p>00°</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
