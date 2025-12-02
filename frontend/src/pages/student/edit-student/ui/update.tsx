import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { useGetStudent } from "@/entities/student";
import { Button, Loader } from "@/shared/ui";
import { Error } from "@/pages/error";
import { StudentUpdateForm } from "@/features/student";

export function Update() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, error, isLoading } = useGetStudent(id!);

  if (isLoading) return <Loader />;

  if (!id) return <Error title="No id" message="no id was provided" />;

  if (error) return <Error title="Failed to get student" message={error.message} />;

  if (!data) return;

  return (
    <div>
      <div className="flex items-center mb-6 gap-2">
        <Button variant="icon" onClick={() => navigate(-1)} icon={<ArrowLeftIcon className="h-5 w-5" />} />
        <h1 className="text-2xl font-semibold text-gray-800">Edit Student</h1>
      </div>
      <StudentUpdateForm id={id} data={data} />
    </div>
  );
}
