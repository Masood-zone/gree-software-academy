import React from "react";
import AnalyticCard from "./analytic-card";
import {
  Users,
  GraduationCap,
  BookOpenCheck,
  DollarSign,
  BadgeCent,
} from "lucide-react";

interface AnalyticsListProps {
  stats: {
    totalUsers: number;
    totalCourses: number;
    totalEnrollments: number;
    totalRevenue: number;
  };
  loading?: boolean;
}

export default function AnalyticsList({ stats, loading }: AnalyticsListProps) {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <AnalyticCard
        title="Total Users"
        value={stats.totalUsers}
        description="Number of registered users."
        icon={<Users size={32} className="text-blue-500" />}
        loading={loading}
      />
      <AnalyticCard
        title="Total Courses"
        value={stats.totalCourses}
        description="Courses available for enrollment."
        icon={<GraduationCap size={32} className="text-green-500" />}
        loading={loading}
      />
      <AnalyticCard
        title="Total Enrollments"
        value={stats.totalEnrollments}
        description="Total course enrollments."
        icon={<BookOpenCheck size={32} className="text-purple-500" />}
        loading={loading}
      />
      <AnalyticCard
        title="Total Revenue"
        value={`Ghc${(stats.totalRevenue / 100).toLocaleString()}`}
        description="Revenue from completed transactions."
        icon={<BadgeCent size={32} className="text-yellow-500" />}
        loading={loading}
      />
    </div>
  );
}
