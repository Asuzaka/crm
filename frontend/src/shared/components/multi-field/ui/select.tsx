import type { MultiFieldSelectProps, SearchType } from "..";
import { Controller, type FieldValues } from "react-hook-form";
import { XIcon, PlusIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../../hooks";
import { useState } from "react";

export function MultiFieldSelect<T extends FieldValues>({
  control,
  name,
  label,
  maxItems = 20,
  initialValues = [],
  fetchOptions,
}: MultiFieldSelectProps<T>) {
  const { query, setQuery, debouncedQuery } = useDebounce();
  const [added, setAdded] = useState<SearchType[]>(initialValues);

  // Fetch options from API with search
  const { data: options = [], isLoading } = useQuery({
    queryKey: [name, debouncedQuery],
    queryFn: () => fetchOptions(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const enrolled: string[] = field.value || [];
        const availableOptions = options.filter((o) => !enrolled.includes(o._id));

        const addItem = (item: SearchType) => {
          if (enrolled.length < maxItems) {
            field.onChange([...enrolled, item._id]);
            setAdded((e: SearchType[]) => [...e, item]);
          }
        };

        const removeItem = (id: string) => {
          field.onChange(enrolled.filter((oid) => oid !== id));
          setAdded((e: SearchType[]) => e.filter((each: SearchType) => each._id !== id));
        };

        return (
          <>
            {/* Enrolled */}
            {enrolled.length > 0 ? (
              <ul className="mb-4 bg-gray-50 rounded-md p-2 divide-y divide-gray-200">
                {added.map((opt) => (
                  <li key={opt._id} className="flex items-center justify-between py-2">
                    <span>{opt.name}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(opt._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mb-4 text-sm text-gray-500">None selected</p>
            )}

            {/* Search */}
            <input
              type="text"
              placeholder={`Search ${label.toLowerCase()}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 mb-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            {/* Results */}
            {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
            {availableOptions.length > 0 && (
              <ul className="bg-gray-50 rounded-md p-2 max-h-60 overflow-y-auto divide-y divide-gray-200">
                {availableOptions.map((opt) => (
                  <li key={opt._id} className="flex items-center justify-between py-2">
                    <span>{opt.name}</span>
                    <button
                      type="button"
                      onClick={() => addItem(opt)}
                      className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" /> Add
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {debouncedQuery.length > 0 && availableOptions.length == 0 && (
              <p className="text-sm text-gray-500">No results</p>
            )}
          </>
        );
      }}
    />
  );
}
