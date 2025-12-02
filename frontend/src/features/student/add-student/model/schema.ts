import { z } from "zod";

export const createSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  groups: z.array(z.string()),
  phone: z.string().min(13, "Enter valid Number"),
  guardian: z.string().min(2, "Guardian's name required"),
  guardianPhone: z.string().min(13, "Enter valid Number"),
  birthDate: z.string(),
  adress: z.string().min(3, "Address required"),
  notes: z.string().optional(),
});

export type createSchemaType = z.infer<typeof createSchema>;
