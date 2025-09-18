import { useEffect, useState } from "react";

export function useDebounce() {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return { query, setQuery, debouncedQuery };
}
