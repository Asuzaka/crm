import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { getReadyQuery } from "../helper/get-ready-query";
import { Button, Loader, Pagination, PanelHeader } from "@/shared/ui";
import { StudentFilters, StudentTable } from "@/widgets/student/students";
import { useDebounce } from "@/shared/hooks";
import { useGetStudents } from "@/entities/student";
import { Error } from "@/pages/error";

export function Students() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const { query, setQuery, debouncedQuery } = useDebounce();

  const { data, isPending, error } = useGetStudents(page, 20, getReadyQuery(debouncedQuery, status));

  if (error) return <Error title="Failed to get students" message={error.message} />;

  return (
    <section className="space-y-6">
      <PanelHeader title="Users">
        <Button icon={<PlusIcon className="h-4 w-4 mr-2" />} onClick={() => navigate("new")}>
          Add Student
        </Button>
      </PanelHeader>

      <StudentFilters status={status} setStatus={setStatus} query={query} setQuery={setQuery} />

      {isPending ? (
        <Loader />
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <StudentTable data={data.data} />
          <Pagination setPage={setPage} page={page} totalPages={data.pages} totalItems={data.documents} />
        </div>
      )}
    </section>
  );
}
