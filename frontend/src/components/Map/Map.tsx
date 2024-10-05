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

const personEmojiStyle = document.createElement("style");
personEmojiStyle.innerHTML = `
  .person-emoji-icon {
    font-size: 32px;
    text-align: center;
    line-height: 32px;
  }
`;

const fireEmojiStyle = document.createElement("style");
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
  const center = latitude && longitude ? [latitude, longitude] : [0, 0];

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ width: "95%", maxWidth: "420px", marginTop: "20px" }}>
        <MapContainer center={center} zoom={zoom} style={{ height: "300px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {latitude && longitude && (
            <Marker position={center} icon={DefaultIcon}>
              <Popup>Your selected location.</Popup>
            </Marker>
          )}

          {fireData.data && fireData.data.length > 0
            ? fireData.data.map((fire, index) => (
                <Marker key={index} position={[fire.lat, fire.lng]} icon={fireEmojiIcon}>
                  <Popup>
                    <div>
                      <p>
                        <strong>Fire Detected:</strong> {fire.detectedAt}
                      </p>
                      <p>
                        <strong>Confidence:</strong> {fire.confidence}
                      </p>
                      <p>
                        <strong>FRP:</strong> {fire.frp}
                      </p>
                      <p>
                        <strong>FWI:</strong> {fire.fwi}
                      </p>
                      <p>
                        <strong>Type:</strong> {fire.fireType}
                      </p>
                      <p>
                        <strong>Category:</strong> {fire.fireCategory}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))
            : null}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
