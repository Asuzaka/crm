import { z } from "zod";

export const roleEnum = z.enum(["owner", "manager"]);

export const permissionsSchema = z.object({
  addStudents: z.boolean(),
  deleteStudents: z.boolean(),
  addPayments: z.boolean(),
});

export const createSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8, "Password at least 8 characters"),
  name: z.string().min(2, "Name is required"),
  role: roleEnum.optional(),
  responsible: z.array(z.string()),
  permissions: permissionsSchema,
});

export type createSchemaType = z.infer<typeof createSchema>;
