import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

interface RoutingProps {
  start: L.LatLngExpression;
  end: L.LatLngExpression;
}

export default function Routing({ start, end }: RoutingProps) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Initialize routing control
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start), L.latLng(end)],
      routeWhileDragging: true,
    }).addTo(map);

    // Cleanup function to remove routing control
    return () => {
      if (routingControl) {
        map.removeControl(routingControl);
      }
    };
  }, [map, start, end]);

  return null;
}
