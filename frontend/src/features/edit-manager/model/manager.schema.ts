import { registerSchema } from "../../add-manager";
import type z from "zod";

export const registerPatchSchema = registerSchema.partial();
export type RegisterPatchFormData = z.infer<typeof registerPatchSchema>;
