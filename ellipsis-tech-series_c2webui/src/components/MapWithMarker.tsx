"use client"
import React, {useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { usePolling } from '@/providers/AlertPollingProvider';
import { alertPopUpParams } from '@/lib/definitions';

const containerStyle = {
    width: '100%',
    height: '50vh'
};

interface location {
    lat: number;
    long: number;
    locationText?: string;
};

export default function MapWithMarker({ lat, long }: location) {
    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!GOOGLE_MAPS_API_KEY) {
        throw new Error("Google Maps API key is missing");
    }

    // const center = {
    //     lat: lat || 0,
    //     lng: long || 0
    // }
    const [center, setCenter] = useState({ lat: lat, lng: long });

    const [firstLoad, setFirstLoad] = useState(true);
    const alerts = usePolling();
    const [markers, setMarkers] = useState<location[]>([{lat: 1.2952203, long: 103.8496329, locationText: "Singapore Management University"} ]);

    useEffect(() => {
        if (alerts.length > 0) {
            const latestAlert: alertPopUpParams = alerts[alerts.length - 1];
            setMarkers(prevMarkers => [...prevMarkers, {lat: latestAlert.lat, long: latestAlert.long, locationText: latestAlert.location}]);
            setCenter({lat: latestAlert.lat, lng: latestAlert.long})
            console.log(`New Incident Marker: ${{lat: latestAlert.lat, long: latestAlert.long}}`);
        }
    }, [alerts]);

    return (
        <div className="border-[4px] border-[#5c6271] rounded-md mb-3">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={19}
                    // onLoad={() => setFirstLoad(false)}
                >
                {/* <Marker position={center} /> */}
                {markers.map((location, index) => (
                    <Marker 
                        key={index} 
                        position={{ lat: location.lat, lng: location.long }}
                        title={location.locationText}
                    />
                ))}
                </GoogleMap>
            </LoadScript>
        </div>
        
    )
}
