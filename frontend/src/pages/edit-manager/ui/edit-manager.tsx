import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { UpdateForm } from "../../../features/edit-manager";

export function EditManager() {
  const navigate = useNavigate();

  const { id } = useParams();

  if (!id) return <p> No id | invalid id </p>;

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
      <UpdateForm id={id}/>
    </>
  );
}
