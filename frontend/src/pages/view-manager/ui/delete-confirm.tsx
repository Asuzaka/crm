interface DeleteProps {
  name?: string;
  onCloseModal?: () => void;
  handleDelete: () => void;
}

export function DeleteConfirm({name, onCloseModal, handleDelete}:DeleteProps){
  return(
     <>
     <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Removal
            </h3>
            <p className="mb-4 text-gray-500">
              Are you sure you want to remove {name}? This will revoke
              their access to the system.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => onCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Remove
              </button>
            </div>
     </>);
}
