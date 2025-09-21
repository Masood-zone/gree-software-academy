import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { LogOut, Settings, User2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardProfile({
  user,
  handleSignOut,
}: {
  user: UserType | null;
  handleSignOut?: () => void;
}) {
  return (
    <div className="pr-4">
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none cursor-pointer flex items-center space-x-2 justify-start">
          {/* Avatar dropdown for authenticated users */}
          <div className="flex md:hidden items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback>
                {user?.name?.charAt(0) || user?.email?.charAt(0) || "USR"}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="hidden md:block">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
              <AvatarFallback>
                {user?.name?.charAt(0) || user?.email?.charAt(0) || "USR"}
              </AvatarFallback>
            </Avatar>
          </div>
          {/* User Information */}
          <div className="hidden md:block">
            <p className="text-sm text-left font-medium">{user?.name}</p>
            <p className="text-sm text-left text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Settings className="mr-2 h-4 w-4" /> Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <User2Icon className="mr-2 h-4 w-4" /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
