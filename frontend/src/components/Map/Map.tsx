import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { DivIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";


const DefaultIcon = new L.DivIcon({
  html: "👥",
  className: "person-emoji-icon",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const fireEmojiIcon = new L.DivIcon({
  html: "🔥",
  className: "fire-emoji-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


const personEmojiStyle = document.createElement('style');
personEmojiStyle.innerHTML = `
  .person-emoji-icon {
    font-size: 32px;
    text-align: center;
    line-height: 32px;
  }
`;
// Define styles for the fire emoji marker (optional)
const fireEmojiStyle = document.createElement('style');
fireEmojiStyle.innerHTML = `
  .fire-emoji-icon {
    font-size: 32px;
    text-align: center;
    line-height: 32px;
  }
`;
document.head.appendChild(fireEmojiStyle);
document.head.appendChild(personEmojiStyle);

interface FireLocation {
  lat: number;
  lng: number;
  detectedAt: string;
  confidence: string;
  frp: number;
  fwi: number;
  fireType: string;
  fireCategory: string;
}

interface FireDataResponse {
  message: string;
  data: FireLocation[];
}

interface MapProps {
  latitude: number | null;
  longitude: number | null;
  fireData: FireDataResponse;
  zoom?: number;
}


L.Marker.prototype.options.icon = DefaultIcon;

const Map: React.FC<MapProps> = ({ zoom = 13, latitude, longitude, fireData }) => {
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

  console.log('fireData: ', fireData)

  return !latLong.loaded ? (
    <p>Loading...</p>
  ) : (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ width: "95%", maxWidth: "420px", marginTop: "10px" }}>
        <MapContainer center={[latLong.lat, latLong.long]} zoom={zoom} style={{ height: "300px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latLong.lat, latLong.long]} icon={DefaultIcon}>
            <Popup>Your approximate location based on your IP.</Popup>
          </Marker>

          {(fireData.data && fireData.data.length > 0) ? fireData.data.map((fire, index) => (
            <Marker
              key={index}
              position={[fire.lat, fire.lng]}
              icon={fireEmojiIcon}
            >
              <Popup>
                <div>
                  <p><strong>Fire Detected:</strong> {fire.detectedAt}</p>
                  <p><strong>Confidence:</strong> {fire.confidence}</p>
                  <p><strong>FRP:</strong> {fire.frp}</p>
                  <p><strong>FWI:</strong> {fire.fwi}</p>
                  <p><strong>Type:</strong> {fire.fireType}</p>
                  <p><strong>Category:</strong> {fire.fireCategory}</p>
                </div>
              </Popup>
            </Marker>
          )) : <p>No fire data available</p>}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;