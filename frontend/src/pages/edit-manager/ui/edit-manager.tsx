import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { UpdateForm, useGetUser } from "../../../features/edit-manager";
import { Loader } from "../../../shared/components";
import { Error } from "../../error";

export function EditManager() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, error, isLoading } = useGetUser(id!);

  if (isLoading) return <Loader />;

  if (!id) return <Error title="No id" message="no id was provided" />;

  if (error)
    return <Error title="Failed to get user" message={error.message} />;

  if (!data) return;

  return (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
      </div>
      <UpdateForm id={id} data={data} />
    </>
  );
}
