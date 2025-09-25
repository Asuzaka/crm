import type z from "zod";
import { createSchema } from "../../add-group";

export const updateSchema = createSchema.partial();

export type GroupUpdateSchema = z.infer<typeof updateSchema>;
