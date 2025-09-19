import type { GetUser } from "../../../entities/user";

export function Permissions({manager}:{manager: GetUser}) {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-5 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Permissions</h3>
      </div>
      <div className="px-6 py-5">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Student Management
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-lg border ${
                  manager.permissions.addStudents
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`h-5 w-5 rounded-full ${
                      manager.permissions.addStudents
                        ? "bg-green-500"
                        : "bg-gray-300"
                    } mr-3 flex items-center justify-center`}
                  >
                    {manager.permissions.addStudents && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      manager.permissions.addStudents
                        ? "text-green-900"
                        : "text-gray-500"
                    }`}
                  >
                    Add Students
                  </span>
                </div>
              </div>
              <div
                className={`p-4 rounded-lg border ${
                  manager.permissions.addStudents
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`h-5 w-5 rounded-full ${
                      manager.permissions.addStudents
                        ? "bg-green-500"
                        : "bg-gray-300"
                    } mr-3 flex items-center justify-center`}
                  >
                    {manager.permissions.addStudents && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      manager.permissions.addStudents
                        ? "text-green-900"
                        : "text-gray-500"
                    }`}
                  >
                    Edit Students
                  </span>
                </div>
              </div>
              <div
                className={`p-4 rounded-lg border ${
                  manager.permissions.deleteStudents
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`h-5 w-5 rounded-full ${
                      manager.permissions.deleteStudents
                        ? "bg-green-500"
                        : "bg-gray-300"
                    } mr-3 flex items-center justify-center`}
                  >
                    {manager.permissions.deleteStudents && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      manager.permissions.deleteStudents
                        ? "text-green-900"
                        : "text-gray-500"
                    }`}
                  >
                    Delete Students
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Financial Management
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-lg border ${
                  manager.permissions.addPayments
                    ? "bg-green-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`h-5 w-5 rounded-full ${
                      manager.permissions.addPayments
                        ? "bg-green-500"
                        : "bg-gray-300"
                    } mr-3 flex items-center justify-center`}
                  >
                    {manager.permissions.addPayments && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      manager.permissions.addPayments
                        ? "text-green-900"
                        : "text-gray-500"
                    }`}
                  >
                    Process Payments
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
