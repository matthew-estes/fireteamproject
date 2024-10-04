import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LocationInfo from "./components/LocationInfo/LocationInfo";
import Temperature from "./components/Temperature/Temperature";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import TopAppBar from "./components/TopAppBar/TopAppBar";
import NavigationDrawer from "./components/NavigationDrawer/NavigationDrawer";
import SignIn from "./components/Account/SignIn";
import SignUp from "./components/Account/SignUp";
import StatusBar from "./components/StatusBar/StatusBar";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map/Map";
import axios from "axios";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [locationData, setLocationData] = useState({ latitude: null, longitude: null });
  const [fireData, setFireData] = useState([]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    // Ensure that fire data is only fetched after we have valid location coordinates
    if (locationData.latitude && locationData.longitude) {
      const fetchFireData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/fire/lat-lng", {
            params: {
              lat: locationData.latitude,
              lng: locationData.longitude,
            },
          });
          setFireData(response.data); // Set fire data when fetched
        } catch (error) {
          console.error("Error fetching fire data:", error);
        }
      };

      fetchFireData();
    }
  }, [locationData]);

  return (
    <div className="mobile-view">
      <StatusBar />
      <TopAppBar toggleDrawer={toggleDrawer} />

      <NavigationDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <div className="weather-card">
        <LocationInfo setLocationData={setLocationData} />
        <Temperature latitude={locationData.latitude} longitude={locationData.longitude} />
      </div>

      <HourlyForecast latitude={locationData.latitude} longitude={locationData.longitude} />

      {/* Pass fireData and locationData to Map */}
      <Map latitude={locationData.latitude} longitude={locationData.longitude} fireData={fireData} />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;