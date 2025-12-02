import z from "zod";
import { StudentCreateSchema } from "../../add-student";

export const updateSchema = StudentCreateSchema.extend({
  email: z.email(),
});
export type updateSchemaType = z.infer<typeof updateSchema>;
