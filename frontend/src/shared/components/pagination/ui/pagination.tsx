import type { PaginationProps } from "..";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRef } from "react";

export function Pagination({
  totalPages,
  totalItems,
  limit = 20,
  page,
  setPage,
}: PaginationProps) {
  const input = useRef<HTMLInputElement | null>(null);

  function handleCustom() {
    if (!input.current?.value) return;
    const value = Number(input.current.value);

    if (isNaN(value)) return;
    if (value < 1 || value > totalPages) return;
    if (value === page) return;

    setPage(value);
  }

  const start = totalItems === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-gray-200 px-4 py-2">
      {/* Results info */}
      <p className="text-sm text-gray-700 mb-2 sm:mb-0">
        Showing <span className="font-medium">{start}</span> to{" "}
        <span className="font-medium">{end}</span> of{" "}
        <span className="font-medium">{totalItems}</span> results
      </p>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => page > 1 && setPage((p) => p - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-md border text-sm font-medium 
                     disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed 
                     hover:bg-gray-50 flex items-center"
        >
          <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Current page */}
        <span className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-semibold">
          {page}
        </span>

        {/* Next button */}
        <button
          onClick={() => page < totalPages && setPage((p) => p + 1)}
          disabled={page === totalPages || totalPages === 0}
          className="px-3 py-1.5 rounded-md border text-sm font-medium 
                     disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed 
                     hover:bg-gray-50 flex items-center"
        >
          <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Go to page input */}
        {totalPages > 0 && (
          <div className="flex items-center space-x-1 ml-3">
            <label htmlFor="custom-page">Go to page: </label>
            <input
              ref={input}
              id="custom-page"
              type="number"
              min={1}
              max={totalPages}
              className="w-16 rounded-md border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="..."
            />
            <button
              onClick={handleCustom}
              className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Go
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
