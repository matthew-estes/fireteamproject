import React from 'react';
import './LocationInfo.css';

function LocationInfo() {
  const [location, setLocation] = useState({ city: '', region: '', country: '' });

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
  }, []);

  return (
    <div className="location-info">
      <h1>My Location</h1>
      <p>Los Angeles</p>
    </div>
  );
}

export default LocationInfo;