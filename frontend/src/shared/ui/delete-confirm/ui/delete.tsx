import { useMutation } from "@tanstack/react-query";
import { Button } from "../../button";
import toast from "react-hot-toast";

interface DeleteProps {
  name?: string;
  id: string;
  Mkey?: string;
  onCloseModal?: () => void;
  deleteApi: (id: string[]) => Promise<void>;
  onSuccess?: () => void;
  onError?: () => void;
}

export function Delete({ onCloseModal, id, name, deleteApi, Mkey, onSuccess, onError }: DeleteProps) {
  const { isPending, mutate } = useMutation({
    mutationFn: () => deleteApi([id]),
    mutationKey: [Mkey],
    onSuccess: onSuccess
      ? onSuccess
      : () => {
          toast.success("Deleted successfully");
        },
    onError: onError
      ? onError
      : () => {
          toast.error("Failed to delete");
        },
  });

  return (
    <>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
      <p className="mb-4 text-gray-500">
        Are you sure you want to delete this {`${name}`}? This action cannot be undone.
      </p>
      <div className="flex justify-end space-x-3">
        <Button onClick={onCloseModal} variant="outline">
          Cancel
        </Button>
        <Button loading={isPending} loadingText="Deleting..." onClick={() => mutate()} variant="destructive" size="sm">
          Delete
        </Button>
      </div>
    </>
  );
}
