import { ReactNode } from "react";
import { getSession } from "next-auth/react";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  console.log(session?.user);

  // if (session?.user?.role !== "ADMIN") {
  //   const searchParams = new URLSearchParams();
  //   searchParams.set("redirectUrl", "/admin");
  //   // redirect(`/auth/login?${searchParams.toString()}`);
  // }

  return (
    <main>
      {/* Sidebar */}
      <AdminSidebar />
      <h1>Admin Dashboard</h1>
      {/* Dashboard content goes here */}
      {children}
    </main>
  );
}
