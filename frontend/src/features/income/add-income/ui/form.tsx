import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

import { SelectOneFieldDynamicSearch, type SearchType } from "@/shared/ui";
import { FormSection, InputField, SelectField, TextAreaField } from "@/shared/ui/field";
import { DollarSignIcon } from "lucide-react";
import { searchStudents } from "@/entities/student";
import { searchGroups } from "@/entities/group";
import type { IncomeCreateSchemaType } from "..";

interface FormProps {
  register: UseFormRegister<IncomeCreateSchemaType>;
  errors: FieldErrors<IncomeCreateSchemaType>;
  control: Control<IncomeCreateSchemaType>;
  student?: SearchType | null;
  group?: SearchType | null;
  disabled?: boolean;
}

export function IncomeForm({ register, errors, control, student, group, disabled = false }: FormProps) {
  return (
    <>
      <FormSection title="Income Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="student" className="block text-sm font-medium text-gray-700">
              Student *
            </label>
            <SelectOneFieldDynamicSearch
              control={control}
              name="student"
              fetchOptions={searchStudents}
              disabled={disabled}
              initialValue={student}
            />
          </div>
          <div>
            <label htmlFor="student" className="block text-sm font-medium text-gray-700">
              Group *
            </label>
            <SelectOneFieldDynamicSearch
              disabled={disabled}
              name="group"
              initialValue={group}
              control={control}
              fetchOptions={searchGroups}
            />
          </div>
          <InputField
            label="Amount *"
            placeholder="0"
            icon={DollarSignIcon}
            type="number"
            error={errors.amount}
            disabled={disabled}
            {...register("amount", { valueAsNumber: true })}
          />

          <div>
            <SelectField
              label="Payment Method *"
              options={[
                { value: "bank", label: "Bank" },
                { value: "cash", label: "Cash" },
                { value: "card", label: "Card" },
              ]}
            />
          </div>
        </div>
      </FormSection>

      <FormSection>
        <TextAreaField
          label="Additional Notes"
          placeholder="Additional payment details..."
          error={errors.notes}
          disabled={disabled}
          {...register("notes")}
        />
      </FormSection>
    </>
  );
}
