export function getReadyQuery(debouncedQuery: string): string {
  let s = "";

  if (debouncedQuery) {
    s += `&search=${debouncedQuery}`;
  }

  return s;
}
