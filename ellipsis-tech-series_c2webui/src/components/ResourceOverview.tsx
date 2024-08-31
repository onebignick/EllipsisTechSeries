import React from 'react';
import OfficerCard from './OfficerCard';
import { officerCardParams } from '@/lib/definitions';

export default function ResourceOverview() {
    // dummy data to display current officers on patrol
    const officers: officerCardParams[] = [
        { name: 'Officer John Doe', location: 'SMU School of Business', shiftDuration: 'Ending in 8 hours' },
        { name: 'Officer Nicholas Ong', location: 'SMU School of Business', shiftDuration: 'Ending in 8 hours' },
        { name: 'Officer Qingyu Liu', location: 'SMU School of Law', shiftDuration: 'Ending in 2 hours' },
        { name: 'Officer Jamie Lau', location: 'SMU School of Law', shiftDuration: 'Ending in 2 hours' },
        { name: 'Officer Harvey Specter', location: 'SMU School of Computing', shiftDuration: 'Ending in 5 hours' },
        { name: 'Officer David Brown', location: 'SMU School of Computing', shiftDuration: 'Ending in 5 hours' },
        { name: 'Autonomous Robot Patrol', location: 'SMU School of Social Sciences', shiftDuration: 'Ending in 15 hours' },
    ];

    return (
        <div className="overflow-y-auto w-full h-full p-4 bg-[#131927] border-[4px] border-[#c6c8ce] rounded-md">
            <h2 className="text-xl font-bold mb-4 text-white">Officers Patrolling</h2>
                {officers.map((officer, index) => (
                    <OfficerCard key={index} name={officer.name} location={officer.location} shiftDuration={officer.shiftDuration}/>
                ))}
        </div>
    )
}
