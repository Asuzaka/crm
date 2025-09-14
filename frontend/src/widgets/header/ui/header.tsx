import { BellIcon, ChevronDownIcon, LogOutIcon, UserIcon } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "../../../app/providers/store/authStore"

export function Header(){
  const { currentUser, logout } = useAuthStore()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-xl font-semibold text-gray-800">CRM</div>
        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
            <BellIcon className="h-6 w-6" />
          </button>
          <div className="relative">
            <button
              className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="bg-blue-500 rounded-full p-1">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {currentUser?.name}
              </span>
              <ChevronDownIcon className="h-4 w-4 text-gray-500" />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {currentUser?.name}
                  </p>
                  <p className="text-xs text-gray-500">{currentUser?.email}</p>
                </div>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={logout}
                >
                  <LogOutIcon className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
