import React from "react";

export default function Header({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <header className="p-4">
      <span className="text-2xl font-bold text-center">
        <span className="">{title ?? "Gree Software Academy"}</span>
        <span className="text-primary">{subtitle ?? "Dashboard"}</span>
      </span>
    </header>
  );
}
