import { RegisterForm } from '../../../features/add-manager'

export function Register(){
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create Manager Account
      </h1>
      <RegisterForm/>
    </div>
  )
}
