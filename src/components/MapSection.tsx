'use client'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import LocationMarker from './LocationMarker'

export default function MapSection() {
    const [isClient, setIsClient] = useState(false)
    const [locate, setLocate] = useState(false)
    const [latLang, setLatLang] = useState({lat: 0, long:0})
    const [initLocate, setInitLocate] = useState(false)
    const getLocation = () => {
        setLocate(true)
    }

    useEffect(() => {
        setIsClient(true)

        if (
            navigator.userAgent.indexOf("AlipayClient") > -1 ||
            navigator.userAgent.indexOf("mPaaSClient") > -1
        ) {
            console.log("triggered")
            
            // let test = { payload: popularMovies.results[0] }
            // window.my.navigateTo({ url: "/pages/index/index"})
            window.my.getLocation({
                success(res) {
                    console.log(res, "<<<<");
                    setLatLang({
                        lat: +res.latitude,
                        long: +res.longitude
                    })
                    setInitLocate(true)
                },
                fail(err) {
                    console.log(err);
                }
            })
        }
    }, [])
    if (!isClient) {
        return null;
    }
    return (
        <>
            <div >
                <div>
                    <p>MAP</p>
                    <p>{latLang.lat} & {latLang.long}</p>
                    <button onClick={getLocation}>get location</button>
                </div>
                {initLocate && <MapContainer style={{ height: "500px", width: "1000px" }} center={[latLang.lat, latLang.long]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer

                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latLang.lat, latLang.long]}>

                    </Marker>
                    <LocationMarker setLocate={setLocate} locate={locate} ></LocationMarker>
                </MapContainer>}
            </div>
        </>
    )
}