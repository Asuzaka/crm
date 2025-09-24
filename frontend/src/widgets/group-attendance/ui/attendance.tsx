import { CheckIcon, XIcon, CalendarIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { generateLessons } from "../helper/generate-table";
import type { Group } from "../../../entities/group";

export function Attendance({ group }: { group: Group }) {
  const currentDate = new Date();

  const [table, setTable] = useState(
    generateLessons(
      { days: ["Monday"] },
      group.students,
      currentDate.getMonth(),
      currentDate.getFullYear()
    )
  );

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
            Attendance for {group.name}
          </h3>
          {/* <div className="mt-3 sm:mt-0 flex space-x-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div> */}
        </div>
        {/* {!hasEditPermission && (
          <p className="mt-2 text-sm text-gray-500">
            You are viewing attendance in read-only mode.
          </p>
        )} */}
      </div>
      <div className="overflow-x-auto">
        {table.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No scheduled classes for this month.
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student
                </th>
                {table.map((date) => (
                  <th
                    key={date.toString()}
                    scope="col"
                    className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {date.date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {group.students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-medium text-blue-800">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  {table.map((date) => {
                    // const dateString = date.toISOString().split("T")[0];
                    // const status = attendance[student.id]?.[dateString];
                    return (
                      <td
                        key={`${student._id}-${date.date}`}
                        className="px-3 py-4 text-center"
                      >
                        <div className="flex justify-center space-x-2">
                          <button
                            type="button"
                            className={`p-1 rounded-full ${
                              status === "present"
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            }`}
                            title="Present"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className={`p-1 rounded-full ${
                              status === "absent"
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            }`}
                            title="Absent"
                          >
                            <XIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
        <button
          type="button"
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${table ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {true ? "Saving..." : "Save Attendance"}
        </button>
      </div>

      {false && (
        <div className="px-6 py-3 bg-green-50 border-t border-green-200">
          <p className="text-sm text-green-600">
            Attendance records saved successfully!
          </p>
        </div>
      )}
    </div>
  );
}
