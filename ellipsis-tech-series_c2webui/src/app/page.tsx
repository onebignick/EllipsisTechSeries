import Image from "next/image";
import AlertPopUp from "@/components/AlertPopUp";
import UserAvatar from "@/components/UserAvatar";
import MapWithMarker from "@/components/MapWithMarker";

export default function Home() {
  return (
    <main>
      <div className="text-white uppercase font-bold text-3xl p-3 flex justify-between items-center">
        <span>Dashboard</span>
        <UserAvatar username="Keith Tay"/>
      </div>
      <div className="m-5 h-1/2 md:w-1/3 border-[4px] border-[#c6c8ce] rounded-md">
        <MapWithMarker lat={1.2976188} long={103.8487032}/>
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
