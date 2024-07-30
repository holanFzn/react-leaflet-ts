"use client"
import { Marker, useMapEvents } from "react-leaflet";
import { Dispatch, useEffect, useState } from "react";
import L from 'leaflet';

interface LocationMarkerProps {
    setLocate: Dispatch<boolean>;
    locate: boolean;
}

export default function LocationMarker({ setLocate, locate }: LocationMarkerProps) {
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const map = useMapEvents({
        locationfound(e) {
            const { lat, lng } = e.latlng;
            setPosition({ lat, lng });
            map.flyTo(e.latlng, 18);
            setLocate(false);
        }
    });

    useEffect(() => {
        if (locate) {
            map.locate({ enableHighAccuracy: true });
        }
    }, [locate, map]);

    return position ? (
        <Marker position={position}>
            {/* <Popup>You are here</Popup> */}
        </Marker>
    ) : null;
}
