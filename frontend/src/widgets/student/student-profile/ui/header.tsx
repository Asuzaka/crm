import type { Student } from "@/entities/student";
import { DeleteStudent } from "@/features/student";
import { ROUTES } from "@/shared/consts/routes";
import { ArrowLeftIcon, EditIcon } from "lucide-react";
import { Link } from "react-router";

export function StudentHeader({ student }: { student: Student }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Link to={ROUTES.students.main} className="mr-4 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-800">Student Details</h1>
      </div>
      <div className="flex space-x-3">
        <Link
          to={ROUTES.students.d.edit(student._id)}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <EditIcon className="h-4 w-4 mr-2" />
          Edit
        </Link>
        <DeleteStudent name={student.name} id={student._id} />
      </div>
    </div>
  );
}
