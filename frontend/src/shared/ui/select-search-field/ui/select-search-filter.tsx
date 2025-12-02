import { useState } from "react";
import { XIcon, SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/shared/hooks";
import type { SearchType } from "../../multi-field";

interface SelectSearchFilterProps {
  label: string;
  value: SearchType;
  onChange: React.Dispatch<React.SetStateAction<SearchType>>;
  placeholder?: string;
  allowAll?: boolean;
  searchApi: (query: string) => Promise<SearchType[]>;
  disabled?: boolean;
}

export function SelectSearchFilter({
  value,
  onChange,
  placeholder = "Search...",
  allowAll = true,
  searchApi,
  disabled,
}: SelectSearchFilterProps) {
  const { query, setQuery, debouncedQuery } = useDebounce();
  const [open, setOpen] = useState(false);

  console.log(value);

  const { data } = useQuery({
    queryKey: [name, debouncedQuery],
    queryFn: () => searchApi(debouncedQuery),
    enabled: debouncedQuery.length > 0 && !disabled,
  });

  return (
    <div className="relative bg-white rounded-lg shadow">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="block w-full px-3 py-2 border font-medium border-gray-100 rounded-md shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
      >
        {value.name || placeholder}
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="flex items-center border-b px-2 py-1">
            <SearchIcon className="h-4 w-4 text-gray-400 mr-1" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full p-1 text-sm focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600">
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <ul className="max-h-48 overflow-auto text-sm">
            {allowAll && (
              <li
                key="all"
                onClick={() => {
                  onChange({ _id: "all", name: "All" });
                  setOpen(false);
                }}
                className={`cursor-pointer px-3 py-2 hover:bg-blue-50 ${
                  value._id === "all" ? "bg-blue-100 font-medium" : ""
                }`}
              >
                All
              </li>
            )}

            {data && data.length > 0 ? (
              data.map((opt) => (
                <li
                  key={opt._id}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={`cursor-pointer px-3 py-2 hover:bg-blue-50 ${
                    opt._id === value._id ? "bg-blue-100 font-medium" : ""
                  }`}
                >
                  {opt.name}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">No results</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
