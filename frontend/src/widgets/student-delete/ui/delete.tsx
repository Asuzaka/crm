import { useDeleteStudent } from "../../../features/delete-student";
import { Button } from "../../../shared/components/button";

interface DeleteProps {
  name?: string;
  onCloseModal?: () => void;
  id: string;
}

export function Delete({ onCloseModal, name = "uknown", id }: DeleteProps) {
  const { mutate } = useDeleteStudent([id]);

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
      <p className="mb-4 text-gray-500">Are you sure you want to delete {name}? This action cannot be undone.</p>
      <div className="flex justify-end space-x-3">
        <Button onClick={onCloseModal} variant="outline">
          Cancel
        </Button>
        <Button onClick={() => mutate()} variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    </>
  );
}
