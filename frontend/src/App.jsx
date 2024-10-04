import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LocationInfo from './components/LocationInfo/LocationInfo';
import Temperature from './components/Temperature/Temperature';
import HourlyForecast from './components/HourlyForecast/HourlyForecast';
import TopAppBar from './components/TopAppBar/TopAppBar';
import NavigationDrawer from './components/NavigationDrawer/NavigationDrawer';
import SignIn from './components/Account/SignIn';
import SignUp from './components/Account/SignUp';
import StatusBar from './components/StatusBar/StatusBar';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Map from './components/Map/Map';
import axios from 'axios';
import AlertBanner from './components/AlertBanner/AlertBanner';

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [locationData, setLocationData] = useState({
    latitude: null,
    longitude: null,
  });
  const [fireData, setFireData] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    if (locationData.latitude && locationData.longitude) {
      const fetchFireData = async () => {
        try {
          const response = await axios.get('/api/fire/lat-lng', {
            params: {
              lat: locationData.latitude,
              lng: locationData.longitude,
            },
          });
          setFireData(response.data);
        } catch (error) {
          console.error('Error fetching fire data:', error);
        }
      };
      fetchFireData();
    }
    const fetchFireAlert = async () => {
      try {
        const response = await axios.get('/fire-alerts');
        const fireData = response.data;
        if (fireData) {
          setAlertMessage('🚨 New fire detected in your area!');
          setAlertVisible(true);

          // Hide the alert after 5 seconds
          setTimeout(() => {
            setAlertVisible(false);
          }, 5000);
        }
      } catch (error) {
        console.error('Error fetching fire alerts:', error);
      }
    };
    const intervalId = setInterval(() => {
      fetchFireAlert();
    }, 10000); // Fetch every 5 seconds

    return () => clearInterval(intervalId);
  }, [locationData]);

  return (
    <div className='mobile-view'>
      <StatusBar />
      <TopAppBar toggleDrawer={toggleDrawer} />
      <NavigationDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <div className='weather-card'>
        <AlertBanner message={alertMessage} visible={alertVisible} />
        <LocationInfo setLocationData={setLocationData} />
        <Temperature
          latitude={locationData.latitude}
          longitude={locationData.longitude}
        />
      </div>
      <HourlyForecast
        latitude={locationData.latitude}
        longitude={locationData.longitude}
      />
      {/* Pass fireData and locationData to Map */}
      <Map
        latitude={locationData.latitude}
        longitude={locationData.longitude}
        fireData={fireData}
      />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
