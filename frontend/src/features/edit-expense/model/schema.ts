import type z from "zod";
import { createExpenseSchema } from "../../add-expense";

export const updateSchema = createExpenseSchema.partial();

export type UpdateSchema = z.infer<typeof updateSchema>;
