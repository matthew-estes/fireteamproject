import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DefaultIcon = L.icon({
    iconRetinaUrl: "/marker-icon-2x.png",
    iconUrl: "/marker-icon.png",
    shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    latitude: number;
    longitude: number;
    zoom?: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude, zoom = 13 }) => {
    const [latLong, setLatLong] = useState({ loaded: false, lat: -1, long: -1 });

    useEffect(() => {
        if (latLong.loaded) {
            return;
        }
        axios.get("/api/iplatlong").then( (response) =>
            setLatLong({ loaded: true, lat: response.data.lat, long: response.data.long })
        );
    }, [latLong.loaded]);

    return (
        !latLong.loaded ? <p>Loading...</p> :
        <MapContainer center={[latLong.lat, latLong.long]} zoom={zoom} style={{ height: "35%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latLong.lat, latLong.long]}>
                <Popup>A pretty popup. <br /> Easily customizable.</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;