import { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import './App.css';

function App() {


  return (
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
);
}


export default App;