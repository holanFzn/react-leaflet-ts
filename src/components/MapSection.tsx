'use client'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import LocationMarker from './LocationMarker'


export default function MapSection() {
    const [isClient, setIsClient] = useState(false)
    const [locate, setLocate] = useState(false)
    const getLocation= ()=>{
        setLocate(true)
    }

useEffect(()=>{
    setIsClient(true)

    // if (
    //     navigator.userAgent.indexOf("AlipayClient") > -1 ||
    //     navigator.userAgent.indexOf("mPaaSClient") > -1
    // ) {
    //     let test = { payload: popularMovies.results[0] }

    //     window.my.navigateTo({ url: "/pages/adit/home/home?message=" + encodeURIComponent(JSON.stringify(test)) })
    // }
},[])
  if (!isClient) {
    return null;
  }
    return (
        <>
            <div >
                <div>
                    <p>MAP</p>
                    <button onClick={getLocation}>get location</button>
                </div>
               {isClient && <MapContainer  style={{height:"500px", width:"1000px"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]}>
  
                    </Marker>
                    <LocationMarker setLocate={setLocate} locate={locate} ></LocationMarker>
                </MapContainer>}
            </div>
        </>
    )
}