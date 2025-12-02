import { useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { useGetIncomes } from "../../../entities/income";
import { Error } from "../../error";
import { Loader, NoResultAndReset, Pagination, PanelSearch } from "@/shared/ui";
import { getReadyQuery } from "../helper/get-query-ready";
import { IncomeHeader, IncomeTable } from "@/widgets/income/income-list";

export function Income() {
  const [page, setPage] = useState(1);
  const { query, setQuery, debouncedQuery } = useDebounce();
  const { data, isPending, error } = useGetIncomes(page, 20, getReadyQuery(debouncedQuery));

  function ResetFilters() {
    console.log("reset");
  }

  if (error) return <Error title="Failed to get payments" message={error.message} />;

  return (
    <div>
      <IncomeHeader />

      <div className="mb-6">
        <PanelSearch setQuery={setQuery} query={query} placeholder="Seach by details..." />
      </div>

      {isPending ? (
        <Loader />
      ) : data.data.length ? (
        <>
          <IncomeTable data={data} />
          <Pagination page={page} setPage={setPage} totalItems={data.documents} totalPages={data.pages} />
        </>
      ) : (
        <NoResultAndReset onClick={ResetFilters} name="payment records" />
      )}
    </div>
  );
}
