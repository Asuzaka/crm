import z from "zod";

const method = z.enum(["cash", "bank", "card"]);

export const createSchema = z.object({
  _id: z.string().optional(),
  group: z.string(),
  amount: z.number(),
  student: z.string(),
  method: method,
  notes: z.string().optional(),
});

export type createSchemaType = z.infer<typeof createSchema>;
