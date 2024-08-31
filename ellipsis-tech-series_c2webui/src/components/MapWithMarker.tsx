"use client"
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '50vh'
};

interface location {
    lat: number
    long: number
};

export default function MapWithMarker({ lat, long }: location) {
    const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!GOOGLE_MAPS_API_KEY) {
        throw new Error("Google Maps API key is missing");
    }

    const center = {
        lat: lat || 0,
        lng: long || 0
    }
    
    return (
        <div className="border-[4px] border-[#5c6271] rounded-md mb-3">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={19}
                >
                <Marker position={center} />
                </GoogleMap>
            </LoadScript>
        </div>
        
    )
}
