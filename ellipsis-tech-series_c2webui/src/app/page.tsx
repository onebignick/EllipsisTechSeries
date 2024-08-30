import Image from "next/image";
import AlertPopUp from "@/components/AlertPopUp";
import UserAvatar from "@/components/UserAvatar";

export default function Home() {
  return (
    <main>
      <div className="text-white uppercase font-bold text-3xl p-3 flex justify-between items-center">
        <span>Dashboard</span>
        <UserAvatar username="Keith Tay"/>
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
