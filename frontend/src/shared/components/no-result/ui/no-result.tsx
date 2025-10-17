import { ClockIcon } from "lucide-react";
import { Button } from "../../button";

export function NoResultAndReset({ onClick }: { onClick: () => void }) {
  return (
    <div className="text-center py-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        <ClockIcon className="h-8 w-8 text-gray-400" />
      </div>
      <p className="text-gray-500 mb-2">No activity records found matching your filters.</p>
      <Button variant="text" onClick={onClick}>
        Clear all filters
      </Button>
    </div>
  );
}
