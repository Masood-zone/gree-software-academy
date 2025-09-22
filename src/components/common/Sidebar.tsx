"use client";
import React from "react";
import Header from "@/components/common/Header";
import LogoutButton from "../navbar/LogoutButton";
import RouteSelect from "./RouteSelect";

export default function Sidebar({
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
