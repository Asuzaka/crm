import { useNavigate, useParams } from "react-router";
import { StudentForm } from "../../../shared/components";
import { useEditStudent } from "..";
import { ArrowLeftIcon } from "lucide-react";
import { useGetStudent } from "../hooks/useGetStudent";
import { mapStudentToForm } from "../util/normalizeObject";

export function EditStudentForm() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { isPending, data } = useGetStudent(id!);

  if (!id) return <p> No id | invalid id </p>;
  if (isPending || !data?.data) return <p>Loading...</p>;

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
      <StudentForm
        initialValues={mapStudentToForm(data)}
        mutationHook={useEditStudent}
        onCancel={() => navigate(-1)}
        isEditing={true}
        initialGroup={data.data.groups}
      />
    </>
  );
}
