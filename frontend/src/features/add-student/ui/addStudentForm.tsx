import { useNavigate } from "react-router";
import { StudentForm } from "../../../shared/components";
import { useCreateStudent } from "../hooks/useCreateStudent";
import { ArrowLeftIcon } from "lucide-react";

export function AddStudentForm() {
  const navigate = useNavigate();
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
        mutationHook={useCreateStudent}
        onCancel={() => navigate(-1)}
      />
    </>
  );
}
