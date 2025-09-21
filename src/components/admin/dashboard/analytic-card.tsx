import React from "react";

interface AnalyticCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
  loading?: boolean;
}
export default function AnalyticCard({
  title,
  value,
  description,
  icon,
  loading,
}: AnalyticCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between h-[160px] min-w-[220px] relative">
      {/* Icon top right */}
      <div className="absolute top-4 right-4 bg-[#F4F6FF] rounded-xl p-2 flex items-center justify-center">
        {icon}
      </div>
      {/* Title top left */}
      <h3 className="text-gray-700 text-base font-medium mb-2">{title}</h3>
      {/* Value center left */}
      {loading ? (
        <div className="animate-pulse h-8 w-24 bg-gray-200 rounded mb-2" />
      ) : (
        <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      )}
      {/* Description */}
      {description && (
        <div className="text-sm text-gray-500 mt-1">{description}</div>
      )}
    </div>
  );
}
