import { Link } from "react-router";
import type { Group } from "../../../entities/group";

export function Students({ group }: { group: Group }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Enrolled Students
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {group.students.length} students currently enrolled
        </p>
      </div>
      <div className="border-t border-gray-200">
        {group.students.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {group.students.map((student) => (
              <li
                key={student._id}
                className="px-4 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                    <span className="font-medium text-blue-800">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {student.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Student ID: {student._id}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/students/${student._id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View Profile
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500">
              No students currently enrolled in this group.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
