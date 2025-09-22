"use client";
import React, { ReactNode, useEffect } from "react";
import AdminNavbar from "@/components/admin/admin-navbar";
import { useMenuToggleStore } from "@/store/menu-toggle-store";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  BookOpenCheck,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import Sidebar from "../common/Sidebar";
import { toast } from "react-toastify";

export default function AdminLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const isOpen = useMenuToggleStore((state) => state.isOpen);

  const session = useSession();
  const router = useRouter();
  if (session.status === "unauthenticated") {
    // Redirect to login if not authenticated
    router.push("/auth/login");
    toast.error("You must be logged in to access the admin dashboard.");
    return null;
  }

  const adminLinks: Link[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Courses", href: "/admin/courses", icon: GraduationCap },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Enrollments", href: "/admin/enrollments", icon: BookOpenCheck },
    { name: "Settings", href: "/admin/settings", icon: Settings },
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
          <Sidebar links={adminLinks} title="Admin" subtitle="Dashboard" />
        )}
      </aside>
      {/* Dashboard content goes here */}
      <div className="flex flex-1 flex-col h-full">
        <AdminNavbar />
        <section className="bg-[#F5F6FA] h-full">{children}</section>
      </div>
    </main>
  );
}
