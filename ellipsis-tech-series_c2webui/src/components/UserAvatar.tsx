import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  interface userAvatarProps {
    username: string;
  }
  
  export default function UserAvatar({ username }: userAvatarProps) {
    return (
        <div className="flex flex-row justify-center items-center gap-2 p-2">
            <Avatar className="border-[1px] border-[#293655]">
                <AvatarImage  src="/personIcon.png" alt={username} />
                <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
            <span className="text-base text-[#c6c8ce]">{username}</span>
        </div>
      
    )
  }
  