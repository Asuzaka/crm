import { z } from "zod";

const methods = z.enum(["cash", "bank", "card", "other"]);

const recipientType = z.enum(["Manager/Staff", "External Vendor"]);

const category = z.enum([
  "Salaries",
  "Equipment",
  "Rent",
  "Utilities",
  "Marketing",
  "Office Supplies",
  "Software",
  "Insurance",
  "Taxes",
  "Other",
]);

export const createSchema = z.object({
  _id: z.string().optional(),
  description: z.string().min(5, "Description at least 5 characters"),
  amount: z.number().min(1, "Amonut at least 1"),
  category: category,
  recipientType: recipientType,
  manager: z.string().optional(),
  vendorName: z.string().optional(),
  paymentMethod: methods,
  notes: z.string().optional(),
});

export type createFormData = z.infer<typeof createSchema>;
