import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

export function useFetchDashboardStats() {
  return useQuery<UserDashboardStatsResponse, Error>({
    queryKey: ["user", "dashboard", "stats"],
    queryFn: async () => {
      const response = await api.get("/user/dashboard/stats");
      return response.data;
    },
  });
}
