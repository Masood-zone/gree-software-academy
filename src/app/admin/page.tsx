"use client";
import { useFetchDashboardStats } from "@/lib/services/admin/dashboard-service";
import AnalyticsList from "@/components/admin/dashboard/analytics-list";

export default function AdminDashboard() {
  const { data: dashboardStats, isPending: dashboardStatsLoading } =
    useFetchDashboardStats();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <AnalyticsList
        stats={
          dashboardStats || {
            totalUsers: 0,
            totalCourses: 0,
            totalEnrollments: 0,
            totalRevenue: 0,
          }
        }
        loading={dashboardStatsLoading}
      />
    </div>
  );
}
