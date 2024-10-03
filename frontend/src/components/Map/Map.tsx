import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const DefaultIcon = L.icon({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ zoom = 13 }) => {
  const [latLong, setLatLong] = useState({ loaded: false, lat: -1, long: -1 });

  useEffect(() => {
    if (latLong.loaded) return;

    const token = import.meta.env.VITE_IPINFO_TOKEN; 

    axios
      .get(`https://ipinfo.io/json?token=${token}`)
      .then((response) => {
        const loc = response.data.loc.split(",");
        setLatLong({ loaded: true, lat: parseFloat(loc[0]), long: parseFloat(loc[1]) });
      })
      .catch((error) => {
        console.error("Error fetching IP location:", error);
      });
  }, [latLong.loaded]);

  return !latLong.loaded ? (
    <p>Loading...</p>
  ) : (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ width: "95%", maxWidth: "420px" }}>
        <MapContainer center={[latLong.lat, latLong.long]} zoom={zoom} style={{ height: "300px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latLong.lat, latLong.long]}>
            <Popup>Your approximate location based on your IP.</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
