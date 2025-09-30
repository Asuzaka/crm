import { z } from "zod";

export const createSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  groups: z.array(z.string()),
  phoneNumber: z.string().min(13, "Enter valid Number"),
  additionalNumber: z.string().optional(),
  fathersName: z.string().min(2, "Father's name required"),
  fathersNumber: z.string().optional(),
  mothersName: z.string().min(2, "Mother's name required"),
  mothersNumber: z.string().optional(),
  birthDate: z.string(),
  adress: z.string().min(3, "Address required"),
  notes: z.string().optional(),
});

export type createSchemaType = z.infer<typeof createSchema>;
