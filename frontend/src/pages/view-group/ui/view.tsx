import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeftIcon,
  EditIcon,
  TrashIcon,
  UserIcon,
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  UsersIcon,
  BookOpenIcon,
  CheckSquareIcon,
} from "lucide-react";
import { Delete } from "../../../widgets/group-delete/ui/delete";
import { Modal } from "../../../shared/ui";
import { useGetGroup } from "../../../features/view-group";
import { Error } from "../../error";
import { Loader } from "../../../shared/components";
import { GroupStudents as Students } from "../../../widgets/group-students";
import { GroupAttendance as Attendance } from "../../../widgets/group-attendance";
import { GroupGrade as Grade } from "../../../widgets/group-grade";
import { GroupPayment as Payment } from "../../../widgets/group-payment";
import { mergeLessons } from "../helper/merge-lessons";
import { generateLessons, type LessonRecord } from "../helper/generate-table";
import { useGetLessons, type Lesson } from "../../../entities/lesson";
import { separateChanged } from "../helper/seperate-changed";
import { formatDate } from "../helper/formatDate";
import { useUpdateLessons } from "../../../features/edit-lesson";
import { useCreateLessons } from "../../../features/add-lesson";

export function View() {
  const currentDate = new Date();
  const { id } = useParams();
  const { data, isPending, error } = useGetGroup(id!);
  const [activeTab, setActiveTab] = useState("overview");
  const { mutate: mutationSave } = useUpdateLessons();
  const { mutate: mutationCreate } = useCreateLessons();
  const [table, setTable] = useState<LessonRecord[]>([]);

  const {
    data: lessons,
    isPending: isLoading,
    error: hasError,
  } = useGetLessons(id!, formatDate(currentDate));

  useEffect(() => {
    if (data && lessons) {
      setTable(
        mergeLessons(
          lessons.data,
          generateLessons(
            data.data.teacher._id,
            data.data._id,
            { days: data.data.schedule.days },
            data.data.students,
            currentDate.getMonth() + 1,
            currentDate.getFullYear()
          )
        )
      );
    }
  }, [data]);

  function onSave() {
    const { toUpdate, toCreate } = separateChanged(lessons?.data || [], table);
    if (toCreate.length !== 0) mutationCreate(toCreate);
    if (toUpdate.length !== 0) mutationSave(toUpdate as Lesson[]);
  }

  console.log(data);

  if (isPending) return <Loader />;

  if (error) return <Error title="Failed to get group" />;

  return (
    <div>
      <Modal>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link
              to="/groups"
              className="mr-4 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold text-gray-800">
              Group Details
            </h1>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/groups/${data.data._id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <EditIcon className="h-4 w-4 mr-2" />
              Edit
            </Link>
            <Modal.Open opens="delete-group">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </button>
            </Modal.Open>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {data.data.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Group ID: {data.data._id}
              </p>
            </div>
            <span
              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                data.data.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {data.data.status}
            </span>
          </div>
          {/* Tabs */}
          <div className="border-t border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("students")}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "students"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab("attendance")}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "attendance"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <CheckSquareIcon className="h-4 w-4 inline mr-1" />
                Attendance
              </button>
              <button
                onClick={() => setActiveTab("grades")}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "grades"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <BookOpenIcon className="h-4 w-4 inline mr-1" />
                Grades
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === "payments"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <DollarSignIcon className="h-4 w-4 inline mr-1" />
                Payments
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-6">
          {activeTab === "overview" && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Instructor
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.data?.teacher?.name || "no-teacher"}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <ClockIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Schedule
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <>
                        {data.data.schedule.days.map((each) => {
                          <p>{each}</p>;
                        })}
                        <p>{data.data.schedule.time}</p>
                      </>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Location
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.data.room || "Not specified"}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <DollarSignIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Monthly Fee
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.data.price} UZS
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <UsersIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Students
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.data.students?.length || "no"}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                      Duration
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.data.start ? (
                        <span>
                          {new Date(data.data.start).toLocaleDateString()}
                        </span>
                      ) : (
                        "Not specified"
                      )}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.data.description}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {activeTab === "students" && <Students group={data.data} />}

          {activeTab === "attendance" && (
            <Attendance
              onSave={onSave}
              error={hasError}
              isPending={isLoading}
              table={table}
              setTable={setTable}
              group={data.data}
            />
          )}

          {activeTab === "grades" && (
            <Grade
              onSave={onSave}
              error={hasError}
              isPending={isLoading}
              table={table}
              setTable={setTable}
              group={data.data}
            />
          )}

          {activeTab === "payments" && <Payment group={data.data} />}
        </div>

        <Modal.Window name="delete-group">
          <Delete name={data.data.name} id={data.data._id} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
