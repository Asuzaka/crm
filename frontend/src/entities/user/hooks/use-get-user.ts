import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/api";

export function useGetUser(id: string) {
  return useQuery({ queryFn: () => getUser(id), queryKey: ["user", id] });
}
