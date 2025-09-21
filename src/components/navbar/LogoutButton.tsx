import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="p-4 border-t h-28">
      <div
        className="w-full cursor-pointer hover:bg-gray-100 mt-4 px-4 py-3 rounded flex items-center gap-3"
        onClick={handleLogout}
      >
        <LogOut size={20} className="-rotate-90" />
        <span>Logout</span>
      </div>
    </div>
  );
}
