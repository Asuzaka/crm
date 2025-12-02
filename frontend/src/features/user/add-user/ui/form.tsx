import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type { UserCreateSchemaType } from "..";
import { searchGroups } from "../../../../entities/group";
import { InputField, Permissions, FormSection, MultiFieldSelect, type SearchType } from "../../../../shared/ui";

interface FormProps {
  register: UseFormRegister<UserCreateSchemaType>;
  errors: FieldErrors<UserCreateSchemaType>;
  control: Control<UserCreateSchemaType>;
  groups?: SearchType[];
}

export function Form({ register, errors, control, groups }: FormProps) {
  return (
    <>
      <FormSection title="Basic Info">
        <div className="space-y-4">
          <InputField label="Full Name" placeholder="Alex Smith" {...register("name")} error={errors.name} />
          <InputField
            label="Email"
            type="email"
            placeholder="user@example.com"
            {...register("email")}
            error={errors.email}
          />
          <InputField
            label="Password"
            type="text"
            placeholder="enter password"
            {...register("password")}
            error={errors.password}
          />
        </div>
      </FormSection>

      <FormSection title="Groups">
        <MultiFieldSelect
          control={control}
          name="groups"
          label="Groups"
          fetchOptions={searchGroups}
          initialValues={groups}
        />
      </FormSection>

      <FormSection title="Permissions">
        <Permissions register={register} />
      </FormSection>
    </>
  );
}
