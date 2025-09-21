import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const useFetchDashboardStats = () =>
  useMutation<DashboardStatsResponse, Error>({
    mutationKey: ["admin", "dashboard", "stats"],
    mutationFn: async () => {
      const response = await api.get("/admin/dashboard/stats");
      return response.data;
    },
  });
