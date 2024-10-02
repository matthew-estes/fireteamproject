import React from 'react';
import './Temperature.css';

function Temperature() {
  return (
    <div>
      <div className="temperature">00°</div>
      <div className="temp-range">Low: 60° |  High: 80°</div>
    </div>
  );
}

export default Temperature;