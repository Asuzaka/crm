import { DollarSignIcon, CheckIcon, MinusIcon } from "lucide-react";
import type { Group } from "../../../entities/group";

export function Payment({ group }: { group: Group }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case "full":
        return <CheckIcon className="h-5 w-5 text-green-600" />;
      case "partial":
        return <MinusIcon className="h-5 w-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getPaymentTooltip = (status: string) => {
    switch (status) {
      case "full":
        return "Fully paid";
      case "partial":
        return "Partially paid";
      default:
        return "Not paid";
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <DollarSignIcon className="h-5 w-5 mr-2 text-gray-500" />
            Payment Overview for {group.name}
          </h3>
          {/* <div className="mt-3 sm:mt-0">
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
        <div className="mt-2 text-sm text-gray-500 flex items-center space-x-4">
          <div className="flex items-center">
            <CheckIcon className="h-4 w-4 text-green-600 mr-1" />
            <span>Fully paid</span>
          </div>
          <div className="flex items-center">
            <MinusIcon className="h-4 w-4 text-yellow-600 mr-1" />
            <span>Partially paid</span>
          </div>
          <div className="flex items-center">
            <span className="h-4 w-4 inline-block mr-1"></span>
            <span>Not paid</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Student
              </th>
              {months.map((month, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {month.substring(0, 3)}
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
                {months.map((_, monthIndex) => {
                  const status = "full";
                  return (
                    <td
                      key={`${student._id}-${monthIndex}`}
                      className="px-3 py-4 text-center"
                      title={getPaymentTooltip(status)}
                    >
                      <div className="flex justify-center">
                        {getPaymentStatusIcon(status)}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          This overview is automatically generated based on payment records. To
          see detailed payment information, check the Income section.
        </p>
      </div>
    </div>
  );
}
