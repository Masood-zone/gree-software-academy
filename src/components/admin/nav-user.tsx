"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NavUser() {
  const { data: session } = useSession();
  const user = session?.user;
  if (!user) return null;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 px-2 py-2 w-full">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.image || ""} alt={user.name || "Admin"} />
            <AvatarFallback className="rounded-lg">
              {user.name?.charAt(0) || "AD"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <span className="font-medium text-sm">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2">
        <div className="flex flex-col gap-2">
          <button className="w-full px-3 py-2 rounded hover:bg-muted text-left">
            Profile
          </button>
          <button className="w-full px-3 py-2 rounded hover:bg-muted text-left">
            Logout
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
