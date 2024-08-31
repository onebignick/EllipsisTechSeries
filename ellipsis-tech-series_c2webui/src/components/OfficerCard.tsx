import React from 'react';
import { officerCardParams } from '@/lib/definitions';

export default function OfficerCard ({ name, location, shiftDuration }: officerCardParams) {
    return (
        <div className="bg-[#242c43] shadow-md rounded-lg p-4 mb-4 text-[#c6c8ce]">
            <h3 className="text-lg font-bold">{name}</h3>
            <p>Location: {location}</p>
            <p>Shift Duration: {shiftDuration}</p>
        </div>
    );
}
