import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, useLogin, type LoginSchemaType } from "..";
import { Button } from "@/shared/ui";
import { LoginForm } from "./form";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) });
  const { mutate, isPending, error } = useLogin();

  const Submit = (data: LoginSchemaType) => {
    mutate(data);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(Submit)}>
      <LoginForm errors={errors} register={register} />
      {error && <div className="text-red-500 text-sm text-center mt-2">{error.message || "Login failed"}</div>}

      <div>
        <Button
          variant="primary"
          type="submit"
          loading={isPending}
          full
          className="group relative flex justify-center"
          loadingText="Logging in..."
        >
          Login
        </Button>
      </div>
    </form>
  );
}
