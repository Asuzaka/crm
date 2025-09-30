import z from "zod";

export const statusEnum = z.enum(["active", "archived", "paused"]);

export const schedule = z.object({
  days: z.array(z.string()),
  time: z.string().min(2, "Time is required"),
});

export const createSchema = z.object({
  _id: z.string().optional(),
  teacher: z.string().min(2, "Teacher is required"),
  name: z.string().min(2, "Name is required"),
  room: z.string().min(2, "Room is required"),
  status: statusEnum,
  description: z.string().min(2, "description is required"),
  price: z.number().min(0, "Price is required"),
  start: z.date(),
  students: z.array(z.string()),
  schedule: schedule,
});

export type createSchemaType = z.infer<typeof createSchema>;
