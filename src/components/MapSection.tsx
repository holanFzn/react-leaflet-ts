'use client'
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState, useRef } from 'react';
import LocationMarker from './LocationMarker';
import L from 'leaflet';
import 'leaflet-routing-machine';

export default function MapSection() {
    const [isClient, setIsClient] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [startLat, setStartLat] = useState<number>(0);
    const [startLng, setStartLng] = useState<number>(0);
    const [destLat, setDestLat] = useState<number>(0);
    const [destLng, setDestLng] = useState<number>(0);
    const [locate, setLocate] = useState(false); // Define locate state
    const mapRef = useRef<L.Map | null>(null);
    const routingControlRef = useRef<L.Routing.Control | null>(null);

    useEffect(() => {
        setIsClient(true);

        if (
            navigator.userAgent.indexOf("AlipayClient") > -1 ||
            navigator.userAgent.indexOf("mPaaSClient") > -1
        ) {
            window.my.getLocation({
                success(res) {
                    const lat = +res.latitude;
                    const lng = +res.longitude;
                    setUserLocation({ lat, lng });
                    setStartLat(lat);
                    setStartLng(lng);
                },
                fail(err) {
                    console.log(err);
                }
            });
        } else {
            // Fallback location for non-supporting browsers
            const fallbackLat = -6.195520;
            const fallbackLng = 106.822968;
            setUserLocation({ lat: fallbackLat, lng: fallbackLng });
            setStartLat(fallbackLat);
            setStartLng(fallbackLng);
        }
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            // Remove existing routing control if present
            if (routingControlRef.current) {
                mapRef.current.removeControl(routingControlRef.current);
            }

            // Add routing control if the destination is set
            if (startLat && startLng && destLat && destLng) {
                routingControlRef.current = L.Routing.control({
                    waypoints: [
                        L.latLng(startLat, startLng),
                        L.latLng(destLat, destLng)
                    ],
                    routeWhileDragging: true
                }).addTo(mapRef.current);

                // Add markers
                L.marker([startLat, startLng]).addTo(mapRef.current).bindPopup('Start Location');
                L.marker([destLat, destLng]).addTo(mapRef.current).bindPopup('Destination');
            }
        }
    }, [startLat, startLng, destLat, destLng]);

    if (!isClient) {
        return null;
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Form submission triggers map update
    };

    return (
        <>
            <div>
                <div>
                    <p>MAP</p>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h3>Start Location</h3>
                            <label>
                                Latitude:
                                <input
                                    type="number"
                                    step="any"
                                    value={startLat}
                                    onChange={(e) => setStartLat(parseFloat(e.target.value))}
                                />
                            </label>
                            <label>
                                Longitude:
                                <input
                                    type="number"
                                    step="any"
                                    value={startLng}
                                    onChange={(e) => setStartLng(parseFloat(e.target.value))}
                                />
                            </label>
                        </div>
                        <div>
                            <h3>Destination Location</h3>
                            <label>
                                Latitude:
                                <input
                                    type="number"
                                    step="any"
                                    value={destLat}
                                    onChange={(e) => setDestLat(parseFloat(e.target.value))}
                                />
                            </label>
                            <label>
                                Longitude:
                                <input
                                    type="number"
                                    step="any"
                                    value={destLng}
                                    onChange={(e) => setDestLng(parseFloat(e.target.value))}
                                />
                            </label>
                        </div>
                        <button type="submit">Update Map</button>
                    </form>
                </div>
                <MapContainer
                    style={{ height: '500px', width: '1000px' }}
                    center={userLocation ? [userLocation.lat, userLocation.lng] : [51.505, -0.09]}
                    zoom={13}
                    scrollWheelZoom={true}
                    ref={(instance) => {
                        if (instance) {
                            mapRef.current = instance;
                        }
                    }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} />}
                    <LocationMarker setLocate={setLocate} locate={locate} />
                </MapContainer>
            </div>
        </>
    );
}
