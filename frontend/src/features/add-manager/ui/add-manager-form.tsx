import { useForm } from "react-hook-form";
import { type RegisterFormData, registerSchema, useRegister } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../widgets/manager-form";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { responsible: [], role: "manager" },
  });

  const { mutate, isPending } = useRegister();

  const Submit = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(Submit)} className="space-y-6">
      <Form register={register} errors={errors} control={control} />
      {/* --- Submit --- */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
        >
          {isPending ? "Creating Manager Account..." : "Create Manager Account"}
        </button>
      </div>
    </form>
  );
}
