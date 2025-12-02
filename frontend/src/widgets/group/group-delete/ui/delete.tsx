import { useDeleteGroup } from "@/features/group/delete-group";
import { Button } from "@/shared/ui";

interface DeleteProps {
  name?: string;
  onCloseModal?: () => void;
  id: string;
}

export function Delete({ name, onCloseModal, id }: DeleteProps) {
  const { mutate } = useDeleteGroup([id]);

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
      <p className="mb-4 text-gray-500">
        Are you sure you want to delete the group "{name}"? This action cannot be undone and will remove all students
        from this group.
      </p>
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
