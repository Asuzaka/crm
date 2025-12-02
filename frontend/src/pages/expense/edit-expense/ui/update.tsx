import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { ExpenseUpdateForm, useGetExpense } from "@/features/expense";
import { Button, Loader } from "@/shared/ui";
import { Error } from "@/pages/error";

export function Update() {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, error, isLoading } = useGetExpense(id!);

  if (isLoading) return <Loader />;

  if (!id) return <Error title="No id" message="no id was provided" />;

  if (error) return <Error title="Failed to get expense" message={error.message} />;

  if (!data) return;

  return (
    <div>
      <div className="flex items-center mb-6 gap-2">
        <Button variant="icon" onClick={() => navigate(-1)} icon={<ArrowLeftIcon className="h-5 w-5" />} />
        <h1 className="text-2xl font-semibold text-gray-800">Edit Group</h1>
      </div>
      <ExpenseUpdateForm id={id} data={data} />
    </div>
  );
}
