import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // optional, disables auto-refetch
      retry: 1, // retry once if query fails
    },
  },
});
