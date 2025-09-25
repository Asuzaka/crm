import { BookOpenIcon } from "lucide-react";
import { useState } from "react";
import { useGetLessons } from "../../../entities/lesson";
import { Error } from "../../../pages/error";
import type { Group } from "../../../entities/group";
import { mergeLessons } from "../../group-attendance/helper/merge-lessons";
import { generateLessons } from "../../group-attendance/helper/generate-table";

export function Grade({ group }: { group: Group }) {
  const currentDate = new Date();
  //  Attendance records saved successfully!

  const { data, isPending, error } = useGetLessons(group._id);

  // func to update Changed Lessons

  function inputFunc(student: string, date: string, value: string) {
    const numValue = parseInt(value);
    if (value !== "" && (isNaN(numValue) || numValue < 0 || numValue > 5)) {
      return;
    }
    setTable((old) =>
      old.map((each) => {
        if (each.date != date) {
          return each;
        }
        const newStudents = each.students.map((each2) =>
          each2.student == student ? { ...each2, grade: numValue } : each2
        );
        return { ...each, students: newStudents };
      })
    );
  }

  const [table, setTable] = useState(
    mergeLessons(
      [],
      generateLessons(
        { days: group.schedule.days },
        group.students,
        currentDate.getMonth() + 1,
        currentDate.getFullYear()
      )
    )
  );

  if (error)
    return <Error title="Failed to get lessons" message={error.message} />;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <BookOpenIcon className="h-5 w-5 mr-2 text-gray-500" />
            Grades for {group.name}
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
                {table.map((date, index) => (
                  <th
                    key={index}
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
                    const d = date.date;
                    const s = student._id;
                    const grade =
                      date.students.find((e) => e.student === s)?.grade ?? null;

                    return (
                      <td key={`${s}-${d}`} className="px-3 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <input
                            type="text"
                            value={grade === null ? "" : grade}
                            onChange={(e) =>
                              inputFunc(student._id, date.date, e.target.value)
                            }
                            className="w-12 text-center py-1 px-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                            placeholder="-"
                          />
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
          {isPending ? "Saving..." : "Save Attendance"}
        </button>
      </div>
    </div>
  );
}
