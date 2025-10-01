import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { UserUpdateForm, useGetUser } from "../../../features/edit-manager";
import { Loader } from "../../../shared/components/loader";
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
          className="mr-4 text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Edit Manager</h1>
      </div>
      <UserUpdateForm id={id} data={data} />
    </>
  );
}
