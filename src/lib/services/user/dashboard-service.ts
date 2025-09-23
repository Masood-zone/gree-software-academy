import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const useFetchDashboardStats = () =>
  useMutation<UserDashboardStatsResponse, Error>({
    mutationKey: ["user", "dashboard", "stats"],
    mutationFn: async () => {
      const response = await api.get("/user/dashboard/stats");
      return response.data;
    },
  });
