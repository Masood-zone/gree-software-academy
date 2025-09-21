"use client";

import * as React from "react";

import { NavMain } from "@/components/admin/nav-main";
import { NavUser } from "@/components/admin/nav-user";
import {
  BarChart,
  BookOpen,
  Layers,
  ClipboardList,
  Users,
  Settings,
  Banknote,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import AdminHeader from "./header";

const data = {
  navMain: [
    { title: "Analytics", url: "/admin", icon: BarChart },
    { title: "Courses", url: "/admin/courses", icon: BookOpen },
    // { title: "Curriculum", url: "/admin/curriculum", icon: Layers },
    // { title: "Enrollments", url: "/admin/enrollments", icon: ClipboardList },
    // { title: "Finance", url: "/admin/finance", icon: Banknote },
    // { title: "Users", url: "/admin/users", icon: Users },
    // { title: "Settings", url: "/admin/settings", icon: Settings },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AdminHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
