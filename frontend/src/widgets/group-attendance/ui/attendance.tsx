import { CheckIcon, XIcon, CalendarIcon } from "lucide-react";
import { type LessonRecord } from "../../../pages/view-group/helper/generate-table";
import { Error } from "../../../pages/error";
import type { Group } from "../../../entities/group";
import { Button } from "../../../shared/components/button";

export function Attendance({
  onSave,
  group,
  table,
  setTable,
  error,
  isPending,
}: {
  onSave: () => void;
  group: Group;
  table: LessonRecord[];
  setTable: React.Dispatch<React.SetStateAction<LessonRecord[]>>;
  error: Error | null;
  isPending: boolean;
}) {
  function presentFunc(student: string, date: string) {
    setTable((old) =>
      old.map((each) => {
        if (each.date != date) {
          return each;
        }
        const newStudents = each.students.map((each2) =>
          each2.student == student ? { ...each2, present: each2.present === true ? null : true } : each2
        );
        return { ...each, students: newStudents };
      })
    );
  }
  function absentFunc(student: string, date: string) {
    setTable((old) =>
      old.map((each) => {
        if (each.date != date) {
          return each;
        }
        const newStudents = each.students.map((each2) =>
          each2.student == student ? { ...each2, present: each2.present === false ? null : false } : each2
        );
        return { ...each, students: newStudents };
      })
    );
  }

  if (error) return <Error title="Failed to get lessons" message={error.message} />;

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
      </div>
      <div className="overflow-x-auto">
        {table.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No scheduled classes for this month.</p>
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
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  {table.map((date) => {
                    const d = date.date;
                    const s = student._id;
                    const present = date.students.find((e) => e.student === s)?.present ?? null;

                    return (
                      <td key={`${s}-${d}`} className="px-3 py-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => presentFunc(student._id, date.date)}
                            type="button"
                            className={`p-1 rounded-full ${
                              present === true
                                ? "bg-green-100 text-green-600"
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            }`}
                            title="Present"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => absentFunc(student._id, date.date)}
                            className={`p-1 rounded-full ${
                              present === false
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
        <Button onClick={onSave} loading={isPending} loadingText="Saving...">
          Save Attendance
        </Button>
      </div>
    </div>
  );
}
