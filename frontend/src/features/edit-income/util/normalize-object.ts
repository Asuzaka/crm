import type { getPaymentType } from "../../../shared/api/types/payment";
import type { IncomeCreateSchemaType } from "../../add-income";

export function mapPaymentResponse(
  data: getPaymentType
): IncomeCreateSchemaType {
  return {
    ...data.data,
    student: data.data.student._id,
    group: data.data.student._id,
  };
}
