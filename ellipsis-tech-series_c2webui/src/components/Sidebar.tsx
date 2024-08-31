import React from 'react';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="h-screen w-60 bg-gray-800 text-white flex flex-col items-left py-4 fixed px-2 bg-[#242c43]">
      <div className="mb-3 p-2 flex flex-row">
        <Image src="/htx-logo.png" alt="agency-logo-user" width={47} height={65}/>
        <div className='w-full text-center flex justify-center items-center font-bold text-[18px]'>
          Officer Patrol<br/>C2 System
        </div>
      </div>

      {/* Navigation Buttons */}
      <nav className="flex flex-col space-y-4 w-full">
        {/* <NavItem icon={<BeakerIcon className="h-6 w-6" />} label="Dashboard" /> */}
        <NavItem url="/#incidentSummary" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" /></svg>} label="Incident Monitoring" />
        <NavItem url="/#map" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" /></svg>} label="Map" />
      </nav>
    </div>
  );
}

function NavItem({ url, icon, label }: any) {
  return (
    <a href={url}>
      <button className="flex items-center gap-x-2 p-2 hover:bg-gray-700 rounded w-full">
        <span>{icon}</span>
        <span className="text-lg">{label}</span>
      </button>
    </a>
  );
}
