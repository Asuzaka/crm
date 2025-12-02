import type z from "zod";
import { ExpenseCreateSchema } from "../../add-expense";

export const updateSchema = ExpenseCreateSchema.partial();

export type UpdateSchema = z.infer<typeof updateSchema>;
