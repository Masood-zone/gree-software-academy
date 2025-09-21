"use client";
import React, { ReactNode } from "react";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminNavbar from "@/components/admin/admin-navbar";
import { useMenuToggleStore } from "@/store/menu-toggle-store";

export default function AdminLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const isOpen = useMenuToggleStore((state) => state.isOpen);
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
        {isOpen && <AdminSidebar />}
      </aside>
      {/* Dashboard content goes here */}
      <div className="flex flex-1 flex-col h-full">
        <AdminNavbar />
        <section className="bg-[#F5F6FA] h-full">{children}</section>
      </div>
    </main>
  );
}
