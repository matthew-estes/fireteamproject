import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LocationInfo.css';

function LocationInfo() {
  const [location, setLocation] = useState({ city: '', region: ''});
  const token = import.meta.env.VITE_IPINFO_TOKEN;

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(`https://ipinfo.io/json?token=${token}`);
        const { city, region} = response.data;
        setLocation({
          city: city || 'Unknown',
          region: region || 'Unknown',
        });
      } catch (error) {
        console.error('Error fetching IP location:', error);
      }
    };

    fetchLocation();
  }, [token]);

  return (
    <div className="location-info">
      <h1>My Location</h1>
      <p>{location.city}, {location.region}</p>
    </div>
  );
}

export default LocationInfo;