import { RegisterForm } from "../../../features/add-manager";

export function Register() {
  return (
    <div className="flex items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create Manager Account
      </h1>
      <RegisterForm />
    </div>
  );
}
