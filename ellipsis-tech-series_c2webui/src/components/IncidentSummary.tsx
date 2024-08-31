"use client"
import React from 'react';
import { useEffect } from 'react';
import { usePolling } from '@/providers/AlertPollingProvider';
import { alertPopUpParams } from '@/lib/definitions';
import IncidentCard from './IncidentCard';
import Image from 'next/image';

export default function IncidentSummary() {
    
    const alerts = usePolling();

    // useEffect(() => {
    //     if (alerts.length > 0) {
    //         const latestAlert: alertPopUpParams = alerts[alerts.length - 1];
    //         // console.log(alerts.length);
    //         console.log(`New Alert: ${latestAlert.itemCategory}`);
    //     }
    // }, [alerts]);

    return (
        <div className='overflow-y-auto w-full h-full p-4 bg-[#131927] rounded-md'>
            <h2 className="text-xl uppercase font-bold mb-4 text-white">Incident Summary:</h2>
            {/* slice is to create a shallow copy */}
            {(alerts.length > 0) ? (
                alerts.slice().reverse().map((alert: alertPopUpParams, index) => (
                    // <div key={index}>{alert.itemName}</div>
                    <IncidentCard
                        key={index}
                        itemCategory={alert.itemCategory}
                        itemName={alert.itemName}
                        location={alert.location}
                        datetime={alert.datetime}
                        lat={alert.lat}
                        long={alert.long}
                        officerName={alert.officerName}
                    />
                ))
            ) : (
                <div className='h-3/4 flex flex-row justify-center items-center'>
                    <h1 className='text-green-400 font-bold text-xl inline'>No active incidents!</h1>
                    <Image
                        className='inline'
                        src="/green-check-mark-icon.png"
                        alt="health-status-green"
                        width={50}
                        height={50}
                    />
                </div>
                
            )}
            
            
        </div>
    )
}
