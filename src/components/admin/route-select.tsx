"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMenuToggleStore } from "@/store/menu-toggle-store";

type AdminLink = {
  name: string;
  href: string;
  icon: React.ElementType;
};

export default function RouteSelect({
  adminLinks = [],
}: {
  adminLinks?: AdminLink[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex-1 p-4 overflow-y-auto">
      <ul className="space-y-2">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <li key={link.href}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-base  transition-colors
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-transparent text-black hover:bg-gray-100"
                  }`}
                style={{ outline: isActive ? "none" : undefined }}
                onClick={() => {
                  router.push(link.href);
                  if (window.innerWidth < 768) {
                    useMenuToggleStore.getState().closeMenu();
                  }
                }}
              >
                <Icon
                  size={20}
                  className={isActive ? "text-white" : "text-black"}
                />
                <span>{link.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
