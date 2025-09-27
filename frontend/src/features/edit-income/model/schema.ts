import z from "zod";
import { IncomeCreateSchema } from "../../add-income";

export const updateSchema = IncomeCreateSchema.extend({
  receiptNumber: z.string().optional(),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
