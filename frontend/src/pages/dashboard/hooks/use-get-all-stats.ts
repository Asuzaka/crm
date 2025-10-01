import { useQueries } from "@tanstack/react-query";
import {
  getStats,
  getStatsOfMethods,
  getStatsOfMoney,
} from "../../../shared/api/endpoints/stats";
import { getRecords } from "../../../shared/api/endpoints/record";

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
