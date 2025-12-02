import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { MultiFieldSelect, type SearchType } from "@/shared/ui";
import { PhoneIcon, UserIcon, MapPinIcon, CalendarIcon, MailIcon } from "lucide-react";
import { FieldErrorText, FormSection, InputField, TextAreaField } from "@/shared/ui/field";
import { searchGroups } from "@/entities/group";
import type { StudentUpdateSchemaType } from "..";

interface FormProps {
  register: UseFormRegister<StudentUpdateSchemaType>;
  errors: FieldErrors<StudentUpdateSchemaType>;
  control: Control<StudentUpdateSchemaType>;
  groups?: SearchType[];
}

export const StudentForm = ({ register, errors, control, groups }: FormProps) => {
  return (
    <>
      <FormSection title="Student Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Full Name *"
            placeholder="Alex Smith"
            icon={MailIcon}
            error={errors.name}
            {...register("name")}
          />

          <InputField
            label="Email *"
            placeholder="email@example.com"
            icon={MapPinIcon}
            error={errors.email}
            {...register("email")}
          />

          <InputField
            label="Phone *"
            placeholder="+998 90 123 4567"
            icon={PhoneIcon}
            type="tel"
            error={errors.phone}
            {...register("phone")}
          />

          <InputField
            label="Date of Birth"
            type="date"
            icon={CalendarIcon}
            error={errors.birthDate}
            {...register("birthDate")}
          />

          <InputField
            label="Address *"
            placeholder="123 Main St, City"
            icon={MapPinIcon}
            error={errors.adress}
            {...register("adress")}
          />
        </div>
      </FormSection>

      <FormSection title="Guardian Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Guardian’s Name *"
            placeholder="Jane Doe"
            icon={UserIcon}
            error={errors.guardian}
            {...register("guardian")}
          />

          <InputField
            label="Guardian’s Phone *"
            placeholder="+998 90 987 6543"
            icon={PhoneIcon}
            type="tel"
            error={errors.guardianPhone}
            {...register("guardianPhone")}
          />
        </div>
      </FormSection>

      <FormSection title="Groups">
        <MultiFieldSelect
          control={control}
          name="groups"
          label="Groups"
          maxItems={5}
          fetchOptions={searchGroups}
          initialValues={groups}
        />
        <FieldErrorText message={errors.groups?.message} />
      </FormSection>

      <FormSection title="Additional Notes">
        <TextAreaField
          label="Notes"
          placeholder="Add any additional information..."
          error={errors.notes}
          {...register("notes")}
        />
      </FormSection>
    </>
  );
};
