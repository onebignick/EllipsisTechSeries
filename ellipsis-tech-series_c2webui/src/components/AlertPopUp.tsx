"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface alertPopUpParams {
    itemCategory: string;
    itemName: string;
    location: string;
    datetime: string;
}

export default function AlertPopUp({itemCategory, itemName, location, datetime} : alertPopUpParams) {
    const router = useRouter();
    const handleAcknowledgement = () => {
        router.push("/reviewDetection")
    }
    return (
    <div className='w-3/4 border-4 border-red-500 rounded-md inline-block capitalize'>
        <div className='text-4xl font-extrabold text-center bg-red-500 py-3 flex items-center justify-center gap-x-2'>
            <Image src="/alert-icon.png" alt='alert icon' width={50} height={50} className='inline'/>
            <span className=''>SUSPICIOUS OBJECT DETECTED</span>
        </div>
        <div className='text-center bg-slate-300'>
            <h1 className='text-2xl pt-2 pb-1 font-bold'>{itemCategory} Detected:<span className='uppercase'>{itemName}</span></h1>
            <h1 className='text-2xl pt-1 pb-2'><span className='font-bold'>Location: </span>{` ${location}`}</h1>
            <h1 className='text-2xl pb-2'><span className='font-bold'>Time Of Detection: </span>{datetime}</h1>
            <button onClick={handleAcknowledgement} className='bg-gray-500 hover:bg-gray-400 border-black border-[3px] p-3 text-[#ffffff] rounded-md mb-3 w-1/4 uppercase font-semibold'>Acknowledge</button>
        </div>
        
    </div>
    )
}
