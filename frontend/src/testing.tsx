import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import {
  ArrowLeftIcon,
  EditIcon,
  TrashIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  MapPinIcon,
  BookOpenIcon,
  ClipboardIcon,
} from 'lucide-react'
import { useGetStudent } from './features/edit-student'


export function Testing(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)


  const {error, data , isPending} = useGetStudent(id!)

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading student information...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-red-500">{error.message}</p>
        <Link to="/students" className="mt-4 text-blue-600 hover:text-blue-800">
          Return to Student List
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link
            to="/students"
            className="mr-4 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-semibold text-gray-800">
            Student Details
          </h1>
        </div>
        <div className="flex space-x-3">
            <Link
              to={`/students/${id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <EditIcon className="h-4 w-4 mr-2" />
              Edit
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Delete
            </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
              <span className="text-xl font-medium text-blue-800">
                {data?.data.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {data?.data.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Student ID: {data?.data._id}
              </p>
            </div>
          </div>
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${data?.data.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
          >
            {data?.data.status}
          </span>
        </div>

        <div className="border-t border-gray-200">
          <dl>
            {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"> */}
            {/*   <dt className="text-sm font-medium text-gray-500 flex items-center"> */}
            {/*     <MailIcon className="h-5 w-5 mr-2 text-gray-400" /> */}
            {/*     Email */}
            {/*   </dt> */}
            {/*   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> */}
            {/*     {data?.data.email} */}
            {/*   </dd> */}
            {/* </div> */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-gray-400" />
                Phone
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.data.phoneNumber}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                Date of Birth
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.data.birthDate || 'Not provided'}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.data.adress || 'Not provided'}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                Parent/Guardian
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.data.fathersName ? (
                  <div>
                    <div>{data.data.fathersName}</div>
                    <div className="text-gray-500">{data.data.fathersNumber}</div>
                  </div>
                ) : (
                  'Not provided'
                )}
              </dd>
            </div>
             <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-gray-400" />
                Parent/Guardian
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.data.mothersName ? (
                  <div>
                    <div>{data.data.mothersNumber}</div>
                    <div className="text-gray-500">{data.data.mothersNumber}</div>
                  </div>
                ) : (
                  'Not provided'
                )}
              </dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <BookOpenIcon className="h-5 w-5 mr-2 text-gray-400" />
                Groups
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {data?.data.groups.map((group) => (
                    <li
                      key={group._id}
                      className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                    >
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">
                          {group.name}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Link
                          to={`/groups/${group._id}`}
                          className="font-medium text-blue-600 hover:text-blue-500"
                        >
                          View Group
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <ClipboardIcon className="h-5 w-5 mr-2 text-gray-400" />
                Notes
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.data.notes || 'No additional notes'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="mb-4 text-gray-500">
              Are you sure you want to delete {data?.data.name}? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
