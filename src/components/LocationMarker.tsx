"use client"
import { Popup } from "leaflet";
import React, { Dispatch, useEffect, useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";

interface LocationMarkerProps{
    setLocate:Dispatch<boolean>
    locate:boolean
    // setLocate: React.Dispatch<React.SetStateAction<boolean>>;
    // locate: boolean;
    // setWaypoint: React.Dispatch<React.SetStateAction<L.LatLngExpression | null>>;
}

export default function LocationMarker({ setLocate, locate }: LocationMarkerProps) {
    const [position, setPosition] = useState<L.LatLngExpression | null>(null);
    const map = useMap(); // Obtain the map instance

    useMapEvents({
        locationfound(e) {
            console.log(e, "<<<<<");
            const { lat, lng } = e.latlng;
            setPosition({ lat, lng });
            map.flyTo(e.latlng, 18);
            setLocate(false);
        }
    });

    useEffect(() => {
        if (locate) {
            map.locate({
                enableHighAccuracy: true,
            });
        }

        // Proper cleanup function
        return () => {
            // No specific cleanup needed for `map.locate`
            // You can leave this empty if nothing needs to be cleaned up
        };
    }, [locate, map]);

    return position === null ? null : (
        <>
            <h1>test</h1>
            <Marker position={position}>
                {/* <Popup>You are here</Popup> */}
            </Marker>
        </>
    );
}

// interface LocationMarkerProps {
//     setLocate: React.Dispatch<React.SetStateAction<boolean>>;
//     locate: boolean;
//     setWaypoint: React.Dispatch<React.SetStateAction<L.LatLngExpression | null>>
//   }
  
//   const LocationMarker: React.FC<LocationMarkerProps> = ({ setLocate, locate, setWaypoint }) => {
//     const [position, setPosition] = useState<L.LatLngExpression | null>(null)
//     const map = useMap()
  
//     useMapEvents({
//       click(e) {
//         if (!position) {
//           setPosition(e.latlng)
//           setWaypoint(e.latlng)
//         } else {
//           setWaypoint(e.latlng)
//         }
//       },
//       locationfound(e) {
//         setPosition(e.latlng)
//         setWaypoint(e.latlng)
//         map.flyTo(e.latlng, 18)
//         setLocate(false)
//       },
//     })
  
//     useEffect(() => {
//       if (locate) {
//         map.locate({
//           enableHighAccuracy: true,
//         })
//       }
//     }, [locate, map])
  
//     return position === null ? null : (
//       <Marker position={position}>
//         {/* <Popup>You are here</Popup> */}
//       </Marker>
//     )
//   }
  
//   export default LocationMarker