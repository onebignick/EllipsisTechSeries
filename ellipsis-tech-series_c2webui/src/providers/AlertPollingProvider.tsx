"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';

const PollingContext = createContext([]);

export const AlertPollingProvider = ({ children }: any) => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const fetchAlerts: any = async () => {
            try {
                const response = await fetch('/api/alertingWebhook');
                const data = await response.json();
                setAlerts(data.alerts);
            } catch (error) {
                console.error("Error fetching alerts:", error);
            }
        };

        const intervalId = setInterval(fetchAlerts, 2000); // poll every 2 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <PollingContext.Provider value={alerts}>
            {children}
        </PollingContext.Provider>
    );
};

export const usePolling = () => {
    return useContext(PollingContext);
};
