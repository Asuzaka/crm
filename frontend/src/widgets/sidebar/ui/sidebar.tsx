import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { MenuIcon, XIcon } from 'lucide-react'
import { useAuthStore } from '../../../app/providers/store/authStore'
import { getNavigation } from '../lib/navigation'

export function Sidebar(){
  const { currentUser } = useAuthStore()
  const navigation = getNavigation(currentUser)
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-20 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-blue-600 text-white focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      {/* Sidebar for mobile */}
      <div
        className={`
        fixed inset-y-0 left-0 z-10 w-64 bg-blue-700 transform transition-transform duration-300 ease-in-out md:hidden
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-blue-800">
            <span className="text-white text-xl font-bold">
              Learning Center
            </span>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-md 
                    ${isActive ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-600'}
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-blue-700">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-blue-800">
              <span className="text-white text-lg font-bold">
                Seul Center
              </span>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`
                        flex items-center px-4 py-2 text-sm font-medium rounded-md 
                        ${isActive ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-600'}
                      `}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
