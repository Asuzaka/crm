import { useQueries } from "@tanstack/react-query";
import { getStats, getStatsOfMethods, getStatsOfMoney } from "../../../shared/api/endpoints/stats";
import { getRecords } from "../../../entities/record/api/api";

export function useGetAllStats() {
  return useQueries({
    queries: [
      {
        queryKey: ["stats-money"],
        queryFn: getStatsOfMoney,
      },
      {
        queryKey: ["stats-methods"],
        queryFn: getStatsOfMethods,
      },
      {
        queryKey: ["stats"],
        queryFn: getStats,
      },
      {
        queryKey: ["latest-activity"],
        queryFn: () => getRecords(1, 5, ""),
      },
    ],
  });
}
