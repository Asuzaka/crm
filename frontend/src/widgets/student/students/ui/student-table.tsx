import type { Student } from "@/entities/student";
import { Link } from "react-router";
import { DeleteStudent } from "@/features/student";

interface Props {
  data: Student[];
}

export function StudentTable({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg text-center py-10">
        <p className="text-gray-500">No students found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Name", "Contact", "Groups", "Status", "Actions"].map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header !== "Actions" ? header : <span className="sr-only">{header}</span>}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((student) => (
            <tr key={student._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-medium text-blue-800">
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    <div className="text-xs text-gray-500">{student._id}</div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{student.phone}</div>
                <div className="text-sm text-gray-500">{student.guardianPhone}</div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {student.groups.map((g, i) => (
                  <span key={i}>
                    {g.name}
                    {i < student.groups.length - 1 ? ", " : ""}
                  </span>
                ))}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    student.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {student.status}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/students/${student._id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                  View
                </Link>
                <Link to={`/students/${student._id}/edit`} className="text-blue-600 hover:text-blue-900 mr-4">
                  Edit
                </Link>
                <DeleteStudent name={student.name} id={student._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
