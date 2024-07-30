import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import LocationMarker from './LocationMarker';
import Routing from './Routing';

type LatLngExpression = [number, number];

export default function MapSection() {
  const [isClient, setIsClient] = useState(false);
  const [locate, setLocate] = useState(false);
  const [start, setStart] = useState<LatLngExpression>([51.505, -0.09]);
  const [end, setEnd] = useState<LatLngExpression>([51.515, -0.1]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const getLocation = () => {
    setLocate(true);
  };

  const handleStartLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStart([parseFloat(e.target.value), start[1]]);
  };

  const handleStartLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStart([start[0], parseFloat(e.target.value)]);
  };

  const handleEndLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnd([parseFloat(e.target.value), end[1]]);
  };

  const handleEndLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnd([end[0], parseFloat(e.target.value)]);
  };

  return (
    <>
      <div>
        <div>
          <p>MAP</p>
          <button onClick={getLocation}>Get Location</button>
        </div>
        <div>
          <h3>Set Route Points</h3>
          <label>
            Start Latitude:
            <input
              type="number"
              step="any"
              value={start[0]}
              onChange={handleStartLatChange}
            />
          </label>
          <label>
            Start Longitude:
            <input
              type="number"
              step="any"
              value={start[1]}
              onChange={handleStartLngChange}
            />
          </label>
          <label>
            End Latitude:
            <input
              type="number"
              step="any"
              value={end[0]}
              onChange={handleEndLatChange}
            />
          </label>
          <label>
            End Longitude:
            <input
              type="number"
              step="any"
              value={end[1]}
              onChange={handleEndLngChange}
            />
          </label>
        </div>
        <MapContainer style={{ height: "500px", width: "1000px" }} center={start} zoom={18} scrollWheelZoom={true}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={start} />
          <Marker position={end} />
          <LocationMarker setLocate={setLocate} locate={locate} />
          <Routing start={start} end={end} />
        </MapContainer>
      </div>
    </>
  );
}
