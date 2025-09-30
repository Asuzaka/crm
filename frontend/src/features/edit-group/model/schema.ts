import type z from "zod";
import { GroupCreateSchema } from "../../add-group";

export const updateSchema = GroupCreateSchema.partial();

export type updateSchemaType = z.infer<typeof updateSchema>;
