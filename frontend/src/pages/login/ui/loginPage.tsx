import { LoginForm } from "../../../features/auth";

export function Login() {
  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Learning Center Management
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Login to your account
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
