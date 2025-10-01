import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Error } from "../../error";
import {
  StudentUpdateForm,
  useGetStudent,
} from "../../../features/edit-student";
import { Loader } from "../../../shared/components/loader";

export function Update() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, error, isLoading } = useGetStudent(id!);

  if (isLoading) return <Loader />;

  if (!id) return <Error title="No id" message="no id was provided" />;

  if (error)
    return <Error title="Failed to get student" message={error.message} />;

  if (!data) return;

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 text-blue-600 hover:text-blue-800 cursor-pointer"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Edit Student</h1>
      </div>
      <StudentUpdateForm id={id} data={data} />
    </div>
  );
}
