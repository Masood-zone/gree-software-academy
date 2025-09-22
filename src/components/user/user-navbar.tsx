"use client";
import { Menu, Search } from "lucide-react";
import React from "react";
import { useSession } from "next-auth/react";
import { useMenuToggleStore } from "@/store/menu-toggle-store";
import DashboardProfile from "../navbar/DashboardProfile";

export default function UserNavbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const toggleMenu = useMenuToggleStore((state) => state.toggleMenu);
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Menu Toggle */}
        <button
          type="button"
          aria-label="Toggle Menu"
          onClick={toggleMenu}
          className="p-2 rounded hover:bg-gray-100"
        >
          <Menu />
        </button>
        {/* Search Bar - Desktop Only */}
        <div className="hidden md:flex items-center bg-[#F6F7FA] border border-gray-200 rounded-full px-4 w-[388px] h-[38px]">
          <Search className="text-gray-400 mr-2" size={22} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none border-none text-gray-500 flex-1 h-full text-base"
            style={{ minWidth: 0 }}
          />
        </div>
        {/* Search Icon - Mobile Only */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          aria-label="Search"
        >
          <Search className="text-gray-400" size={22} />
        </button>
      </div>
      {/* User Profile */}
      <DashboardProfile
        user={{
          ...user,
          name: user?.name ?? undefined,
          email: user?.email ?? undefined,
          image: user?.image ?? undefined,
        }}
      />
    </div>
  );
}
