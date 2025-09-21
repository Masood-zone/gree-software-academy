"use client";
import React from "react";
import AdminHeader from "./admin-header";
import RouteSelect from "./route-select";
import {
  BookOpenCheck,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import LogoutButton from "../navbar/LogoutButton";

export default function AdminSidebar() {
  const adminLinks: AdminLink[] = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Courses", href: "/admin/courses", icon: GraduationCap },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Enrollments", href: "/admin/enrollments", icon: BookOpenCheck },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <AdminHeader />
      {/* Route links */}
      <RouteSelect adminLinks={adminLinks} />
      {/* Logout button */}
      <LogoutButton />
    </div>
  );
}
