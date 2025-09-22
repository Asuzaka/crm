interface DeleteProps {
  name?: string;
  onCloseModal?: () => void;
  id: string;
}

export function Delete({ name, onCloseModal, id }: DeleteProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Confirm Deletion
        </h3>
        <p className="mb-4 text-gray-500">
          Are you sure you want to delete this expense record? This action
          cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCloseModal}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => console.log(`deleted ${id}`)}
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
