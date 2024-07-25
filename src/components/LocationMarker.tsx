"use client"
import { Popup } from "leaflet";
import { Dispatch, useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";

interface LocationMarkerProps{
    setLocate:Dispatch<boolean>
    locate:boolean
}
export default function LocationMarker ({ setLocate, locate }: LocationMarkerProps) {
    const [position, setPosition] = useState({lat:0, lng:0});
    const map = useMapEvents({
        locationfound(e) {
            console.log(e, "<<<<<");
            let {lat, lng} = e.latlng
            setPosition({lat, lng});
            map.flyTo(e.latlng,18);
            setLocate(false)
        }
    });

    useEffect(() => {
        if (locate) {
            map.locate({
                enableHighAccuracy: true,
            });
        }
    }, [locate, map]);

    return position === null ? null : (
        <>
        <h1>test</h1>
        <Marker position={position} >
            {/* <Popup>You are here</Popup> */}
        </Marker>
        </>
    );
};