import { UserCreateSchema } from "../..";
import type z from "zod";

export const updateSchema = UserCreateSchema.omit({ password: true });
export type updateSchemaType = z.infer<typeof updateSchema>;
