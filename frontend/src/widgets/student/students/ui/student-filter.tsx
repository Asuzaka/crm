import { FilterIcon } from "lucide-react";
import { PanelSearch } from "@/shared/ui";

interface Props {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function StudentFilters({ status, setStatus, query, setQuery }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      <PanelSearch query={query} setQuery={setQuery} placeholder="Search students..." />

      <div className="relative bg-white rounded-lg shadow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FilterIcon className="h-5 w-5 text-gray-400" />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
    </div>
  );
}
