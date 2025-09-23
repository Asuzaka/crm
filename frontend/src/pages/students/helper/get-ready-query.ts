export function getReadyQuery(debouncedQuery: string, status: string): string {
  let s = "";

  if (debouncedQuery) {
    s += `&search=${debouncedQuery}`;
  }
  if (status !== "all") {
    s += `&status=${status}`;
  }

  return s;
}
