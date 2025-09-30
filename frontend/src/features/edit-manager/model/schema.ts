import { UserCreateSchema } from "../../add-manager";
import type z from "zod";

export const updateSchema = UserCreateSchema.partial();
export type updateSchemaType = z.infer<typeof updateSchema>;
