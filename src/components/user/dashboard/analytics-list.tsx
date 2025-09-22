import React from "react";
import AnalyticCard from "../../common/AnalyticCard";
import { GraduationCap, BadgeCent } from "lucide-react";

interface AnalyticsListProps {
  stats: {
    totalCourses: number;
    saveToLearnWallet: number;
    totalSpent?: number;
  };
  loading?: boolean;
}

export default function AnalyticsList({ stats, loading }: AnalyticsListProps) {
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
      <AnalyticCard
        title="Total Courses"
        value={stats.totalCourses}
        description="Courses enrolled by you."
        icon={<GraduationCap size={32} className="text-green-500" />}
        loading={loading}
      />
      <AnalyticCard
        title="Save to Learn Wallet"
        value={`Ghc${(stats.saveToLearnWallet / 100).toLocaleString()}`}
        description="Current wallet balance."
        icon={<BadgeCent size={32} className="text-yellow-500" />}
        loading={loading}
      />
      {/* <AnalyticCard
        title="Total Spent"
        value={`Ghc${(stats.totalSpent
          ? stats.totalSpent / 100
          : 0
        ).toLocaleString()}`}
        description="Total amount spent on courses."
        icon={<BadgeCent size={32} className="text-red-500" />}
        loading={loading}
      /> */}
    </div>
  );
}
