import { Controller, type FieldValues } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { SelectSingleSearchProps } from "../model/types/type";
import type { SearchType } from "../../multi-field";
import { useDebounce } from "../../../hooks";

export function SelectOneFieldDynamicSearch<T extends FieldValues>({
  control,
  name,
  initialValue = null,
  fetchOptions,
  disabled = false,
}: SelectSingleSearchProps<T>) {
  const { query, setQuery, debouncedQuery } = useDebounce();
  const [selected, setSelected] = useState<SearchType | null>(initialValue);

  // Fetch options from API with search
  const { data: options = [], isLoading } = useQuery({
    queryKey: [name, debouncedQuery],
    queryFn: () => fetchOptions(debouncedQuery),
    enabled: debouncedQuery.length > 0 && !disabled,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const handleSelect = (opt: SearchType) => {
          if (disabled) return;
          field.onChange(opt._id);
          setSelected(opt);
        };

        const clearSelection = () => {
          if (disabled) return;
          field.onChange(null);
          setSelected(null);
        };

        return (
          <>
            {/* Selected */}
            {selected ? (
              <div className="mb-4 flex items-center justify-between bg-gray-50 p-2 rounded-md">
                <span>{selected.name}</span>
                <button type="button" onClick={clearSelection} className="text-red-600 hover:text-red-900 text-sm">
                  Remove
                </button>
              </div>
            ) : (
              <p className="mb-4 text-sm text-gray-500">None selected</p>
            )}

            {!disabled && (
              <>
                {/* Search */}
                <input
                  type="text"
                  placeholder={`Search ${name.toLowerCase()}...`}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />

                {/* Results */}
                {isLoading && <p className="text-sm text-gray-500">Loading...</p>}

                {options.length > 0 && (
                  <ul className="bg-gray-50 rounded-md p-2 max-h-60 overflow-y-auto divide-y divide-gray-200">
                    {options.map((opt) => (
                      <li key={opt._id} className="flex items-center justify-between py-2">
                        <span>{opt.name}</span>
                        <button
                          type="button"
                          onClick={() => handleSelect(opt)}
                          className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Select
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {debouncedQuery.length > 0 && options.length == 0 && (
                  <p className="text-sm text-gray-500">No results</p>
                )}
              </>
            )}
          </>
        );
      }}
    />
  );
}
