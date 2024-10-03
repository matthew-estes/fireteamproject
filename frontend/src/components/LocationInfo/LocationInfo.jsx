import React from 'react';
import './LocationInfo.css';

function LocationInfo() {
  const [location, setLocation] = useState({ city: '', region: '', country: '' });

  return (
    <div className="location-info">
      <h1>My Location</h1>
      <p>Los Angeles</p>
    </div>
  );
}

export default LocationInfo;