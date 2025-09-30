import { StudentCreateSchema } from "../../add-student";
import type z from "zod";

export const updateSchema = StudentCreateSchema.partial();
export type updateSchemaType = z.infer<typeof updateSchema>;
