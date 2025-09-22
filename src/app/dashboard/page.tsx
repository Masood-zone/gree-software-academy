"use client";
import AnalyticsList from "@/components/user/dashboard/analytics-list";
import { useFetchDashboardStats } from "@/lib/services/user/dashboard-service";
import React from "react";

export default function DashboardPage() {
  const { data: dashboardStats, isPending: dashboardStatsLoading } =
    useFetchDashboardStats();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <AnalyticsList
        stats={{
          totalCourses: dashboardStats?.totalCourses ?? 0,
          saveToLearnWallet: dashboardStats?.saveToLearnWallet ?? 0,
        }}
        loading={dashboardStatsLoading}
      />
    </div>
  );
}
