import { useState } from "react";
import { useNavigate } from "react-router";

import { getReadyQuery } from "../helper/get-ready-query";
import { returnColorOfAction } from "../helper/return-color";
import { Error } from "@/pages/error";
import { useGetRecords } from "@/entities/record";
import { useDebounce } from "@/shared/hooks";
import { ActivityTable } from "@/widgets/history";
import { Button, Loader, PanelSearch, SelectFilter, SelectSearchFilter, type SearchType } from "@/shared/ui";
import {
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FileType2,
  FilterIcon,
  ShieldQuestionMarkIcon,
} from "lucide-react";
import { searchUsers } from "@/entities/user";
import { actions, dateOptions, entities } from "../modal/constants";

export function History() {
  const navigate = useNavigate();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [managerFilter, setManagerFilter] = useState<SearchType>({ _id: "all", name: "Filter by user" });
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [entityFilter, setEntityFilter] = useState<string>("all");

  const { query, setQuery, debouncedQuery } = useDebounce();

  const { data, isPending, error } = useGetRecords(page, 20, getReadyQuery(debouncedQuery));

  if (error) return <Error title="Failed to fetch activity" message={error.message} />;

  const handleResetFilters = () => {
    setQuery("");
    setPage(1);
    setDateFilter("all");
    setManagerFilter({ _id: "all", name: "Filter by user" });
    setActionFilter("all");
    setEntityFilter("all");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Activity History</h1>
        <p className="text-gray-600">Track all actions performed by managers across the system.</p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <PanelSearch setQuery={setQuery} query={query} placeholder="Seach by details..." />

          <SelectFilter
            icon={<CalendarIcon className="h-5 w-5 text-gray-400" />}
            value={dateFilter}
            onChange={setDateFilter}
            options={dateOptions}
          />

          <div>
            <Button full variant="outline" onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
              <FilterIcon className="h-4 w-4 mr-2" />
              {showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}
              {showAdvancedFilters ? (
                <ChevronUpIcon className="h-4 w-4 ml-1" />
              ) : (
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {showAdvancedFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectSearchFilter
              label="user"
              value={managerFilter}
              onChange={setManagerFilter}
              placeholder="Search users..."
              searchApi={searchUsers}
            />

            <SelectFilter
              icon={<ShieldQuestionMarkIcon className="h-5 w-5 text-gray-400" />}
              value={actionFilter}
              onChange={setActionFilter}
              options={actions}
            />

            <SelectFilter
              icon={<FileType2 className="h-5 w-5 text-gray-400" />}
              value={entityFilter}
              onChange={setEntityFilter}
              options={entities}
            />
          </div>
        )}
      </div>

      {isPending ? (
        <Loader />
      ) : (
        <ActivityTable
          data={data}
          navigate={navigate}
          returnColorOfAction={returnColorOfAction}
          handleResetFilters={handleResetFilters}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
}
