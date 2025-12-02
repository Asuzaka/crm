import { object, z } from "zod";

export const roleEnum = z.enum(["owner", "manager"]);

export const permissionSchema = z.object({
  create: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
  access: z.boolean(),
});

export const permissionsSchema = z.object({
  students: permissionSchema,
  users: permissionSchema,
  dashboard: permissionSchema,
  expences: permissionSchema,
  income: permissionSchema,
  groups: permissionSchema,
  history: permissionSchema,
});

export const createSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  role: roleEnum.optional(),
  password: z.string().min(8, "Password at least 8 characters"),
  permissions: permissionsSchema,
  groups: z.array(z.string()),
});

export type createSchemaType = z.infer<typeof createSchema>;
export type createSchemaBaseType = z.infer<typeof object>;
