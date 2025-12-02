import { ArrowLeftIcon, Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useGetUser, UserEditForm } from "../../../../features/user";
import { Error } from "../../../error";
import { Button } from "@/shared/ui";

export function EditUser() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, error, isLoading } = useGetUser(id!);

  if (isLoading) return <Loader />;

  if (!id) return <Error title="No id" message="no id was provided" />;

  if (error) return <Error title="Failed to get user" message={error.message} />;

  if (!data) return;

  return (
    <>
      <div className="flex items-center mb-6 gap-2">
        <Button variant="icon" onClick={() => navigate(-1)} icon={<ArrowLeftIcon className="h-5 w-5" />} />
        <h1 className="text-2xl font-semibold text-gray-800">Edit User</h1>
      </div>
      <UserEditForm id={id} data={data} />
    </>
  );
}
