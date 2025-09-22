import UserLayout from "@/components/layouts/user-layout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UserLayout>{children}</UserLayout>;
}
