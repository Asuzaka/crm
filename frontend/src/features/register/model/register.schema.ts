import { z } from "zod";

export const roleEnum = z.enum(["owner", "manager"]);

export const permissionsSchema = z.object({
  addStudents: z.boolean(),
  deleteStudents: z.boolean(),
  addPayments: z.boolean(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  role: roleEnum,
  responsible: z.array(z.string()), 
  permissions: permissionsSchema,
});

export type RegisterFormData = z.infer<typeof registerSchema>;
