import { InputField } from "@/shared/ui";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { LoginSchemaType } from "../model/loginSchema";

interface LoginFormProps {
  errors: FieldErrors<LoginSchemaType>;
  register: UseFormRegister<LoginSchemaType>;
}

export function LoginForm({ errors, register }: LoginFormProps) {
  return (
    <div className="rounded-md space-y-2">
      <InputField
        id="email"
        label="Email address"
        type="email"
        placeholder="Email address"
        error={errors.email}
        {...register("email")}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="password"
        error={errors.password}
        {...register("password")}
      />
    </div>
  );
}
