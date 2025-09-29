import type { PaymentResponse } from "../../../shared/api/types";
import type { IncomeCreateSchemaType } from "../../add-income";

export function mapPaymentResponse(
  data: PaymentResponse
): IncomeCreateSchemaType {
  return {
    ...data.data,
    student: data.data.student._id,
    group: data.data.student._id,
  };
}
