"use client";

import React, { ReactNode } from "react";
import { useMenuToggleStore } from "@/store/menu-toggle-store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BookOpenCheck,
  GraduationCap,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Sidebar from "../common/Sidebar";
import UserNavbar from "../user/user-navbar";
import { toast } from "react-toastify";

export default function UserLayout({ children }: { children: ReactNode }) {
  const isOpen = useMenuToggleStore((state) => state.isOpen);
  const session = useSession();
  const router = useRouter();

  if (session.status === "unauthenticated") {
    // Redirect to login if not authenticated
    router.push("/auth/signin");
    toast.error("You must be logged in to access the user dashboard.");
    return null;
  }

  const userLinks: Link[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Courses", href: "/dashboard/courses", icon: GraduationCap },
    { name: "Finances", href: "/dashboard/finances", icon: BookOpenCheck },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <main
      className={`min-h-screen grid transition-all duration-300 ${
        isOpen ? "grid-cols-[240px_1fr]" : "grid-cols-[0px_1fr]"
      }`}
    >
      {/* Sidebar*/}
      <aside
        className={`h-screen overflow-y-auto sticky top-0 bg-white transition-all duration-300 ${
          isOpen ? "w-[240px]" : "w-0"
        }`}
      >
        {isOpen && (
          <Sidebar links={userLinks} title="User" subtitle="Dashboard" />
        )}
      </aside>
      {/* Dashboard content goes here */}
      <div className="flex flex-1 flex-col h-full">
        <UserNavbar />
        <section className="bg-[#F5F6FA] h-full">{children}</section>
      </div>
    </main>
  );
}
