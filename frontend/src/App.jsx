import React, { useState } from "react";
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

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [locationData, setLocationData] = useState({ latitude: null, longitude: null });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="mobile-view">
      <StatusBar />
      <TopAppBar toggleDrawer={toggleDrawer} />

      <NavigationDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <div className="weather-card">
        <LocationInfo setLocationData={setLocationData} />
        <Temperature latitude={locationData.latitude} longitude={locationData.longitude} />
      </div>

      <HourlyForecast />

      <Map />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
