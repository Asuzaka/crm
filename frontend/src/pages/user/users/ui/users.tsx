import { useNavigate } from "react-router";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

import { getReadyQuery, useGetUsers } from "../../../../entities/user";
import { Error } from "../../../error";
import { useDebounce } from "../../../../shared/hooks";
import { UsersTable } from "../../../../widgets/user";
import { Button, Loader, Pagination, PanelHeader, PanelSearch } from "../../../../shared/ui";

export function Users() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { query, setQuery, debouncedQuery } = useDebounce();
  const { data, isPending, error } = useGetUsers(page, 20, getReadyQuery(debouncedQuery));

  if (error) return <Error title="Failed to fetch users" message={error.message} />;

  return (
    <section className="space-y-6">
      <PanelHeader title="Users">
        <Button icon={<PlusIcon className="h-4 w-4 mr-2" />} onClick={() => navigate("new")}>
          Add User
        </Button>
      </PanelHeader>

      <PanelSearch query={query} setQuery={setQuery} placeholder="Search users..." />

      {isPending ? (
        <Loader />
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <UsersTable data={data} />
          <Pagination setPage={setPage} page={page} totalPages={data.pages} totalItems={data.documents} />
        </div>
      )}
    </section>
  );
}
