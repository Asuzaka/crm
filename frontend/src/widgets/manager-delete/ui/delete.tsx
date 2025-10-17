import { useDeleteUser } from "../../../features/delete-manager";
import { Button } from "../../../shared/components/button";

interface DeleteProps {
  name?: string;
  onCloseModal?: () => void;
  id: string;
}

export function Delete({ name, onCloseModal, id }: DeleteProps) {
  const { mutate } = useDeleteUser([id]);

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Removal</h3>
      <p className="mb-4 text-gray-500">
        Are you sure you want to remove {name}? This will revoke their access to the system.
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
