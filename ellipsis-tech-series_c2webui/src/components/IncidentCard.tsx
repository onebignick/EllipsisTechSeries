import React from 'react';
import Image from 'next/image';
import { alertPopUpParams } from '@/lib/definitions';

export default function IncidentCard({itemCategory, itemName, location, datetime} : alertPopUpParams) {
    return (
        <div className="bg-[#242c43] shadow-md rounded-md p-3 mb-4 text-[#c6c8ce]">
            <div className='font-extrabold text-center bg-red-500 py-3 flex items-center justify-start gap-x-2 px-2 rounded-md'>
                <Image src="/exclamation_red_icon.png" alt='alert icon' width={25} height={25} className='inline'/>
                <span className=''>SUSPICIOUS OBJECT DETECTED</span>
            </div>
            <h3 className="text-lg font-bold">{}</h3>
            <p className='font-bold pt-1'>{`OBJECT: ${itemName} (${itemCategory[0].toUpperCase() + itemCategory.slice(1)})`}</p>
            <p className='font-bold'>LOCATION: {location}</p>
            <p className='font-bold'>DATETIME: {datetime}</p>
        </div>
    )
}
