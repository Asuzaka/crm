import z from "zod";
import { IncomeCreateSchema } from "../../add-income";

export const updateSchema = IncomeCreateSchema.omit({
  group: true,
  student: true,
}).partial();

export type updateSchemaType = z.infer<typeof updateSchema>;
