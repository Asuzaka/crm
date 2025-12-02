import type { category } from "@/entities/expense";

export function getColor(a: category): string {
  switch (a) {
    case "Salaries":
      return "bg-blue-100 text-blue-800";
    case "Equipment":
      return "bg-green-100 text-green-800";
    case "Rent":
      return "bg-yellow-100 text-yellow-800";
    case "Utilities":
      return "bg-purple-100 text-purple-800";
    case "Marketing":
      return "bg-pink-100 text-pink-800";
    case "Office Supplies":
      return "bg-gray-100 text-gray-800";
    case "Software":
      return "bg-indigo-100 text-indigo-800";
    case "Insurance":
      return "bg-red-100 text-red-800";
    case "Taxes":
      return "bg-orange-100 text-orange-800";
    case "Other":
      return "bg-slate-100 text-slate-800";
    default:
      return "bg-gray-100 text-gray-800"; // default
  }
}
