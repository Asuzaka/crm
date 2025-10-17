import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Error } from "../../error";
import { GroupUpdateForm } from "../../../features/edit-group";
import { useGetGroup } from "../../../features/view-group";
import { Loader } from "../../../shared/components/loader";
import { Button } from "../../../shared/components/button";

export function Edit() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, error, isLoading } = useGetGroup(id!);

  if (isLoading) return <Loader />;

  if (!id) return <Error title="No id" message="no id was provided" />;

  if (error) return <Error title="Failed to get group" message={error.message} />;

  if (!data) return;

  return (
    <div>
      <div className="flex items-center mb-6 gap-2">
        <Button variant="icon" onClick={() => navigate(-1)} icon={<ArrowLeftIcon className="h-5 w-5" />} />
        <h1 className="text-2xl font-semibold text-gray-800">Edit Group</h1>
      </div>
      <GroupUpdateForm id={id} data={data} />
    </div>
  );
}
