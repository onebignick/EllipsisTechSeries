import Image from "next/image";
import AlertPopUp from "@/components/AlertPopUp";
import UserAvatar from "@/components/UserAvatar";
import MapWithMarker from "@/components/MapWithMarker";
import ResourceOverview from "@/components/ResourceOverview";
import IncidentSummary from "@/components/IncidentSummary";

export default function Home() {
  return (
    <main className="h-[100vh]">
      <div className="text-white uppercase font-bold text-3xl p-4 flex justify-between items-center">
        <span>Dashboard</span>
        <UserAvatar username="Keith Lim"/>
      </div>

      <div className="px-3 h-full w-full flex flex-row gap-x-4">
        <div className="flex flex-col gap-y-4 = h-fit md:w-3/4 ">
          <MapWithMarker lat={1.2976188} long={103.8487032}/>
          <IncidentSummary/>
        </div>
        <div className="w-1/4">
          <ResourceOverview />
        </div>
      </div>
      
      {/* <AlertPopUp
        itemCategory="weapon"
        itemName="Knife"
        location="SMU School of Business"
        datetime={Date().toLocaleString().split('GMT')[0].trim()}
      /> */}
    </main>
  );
}
