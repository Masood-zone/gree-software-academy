"use client";
import React from "react";
import Header from "@/components/common/Header";
import RouteSelect from "../common/RouteSelect";
import LogoutButton from "../navbar/LogoutButton";

export default function AdminSidebar({
  links,
  title,
  subtitle,
}: {
  links?: Link[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header title={title} subtitle={subtitle} />
      {/* Route links */}
      <RouteSelect adminLinks={links} />
      {/* Logout button */}
      <LogoutButton />
    </div>
  );
}
