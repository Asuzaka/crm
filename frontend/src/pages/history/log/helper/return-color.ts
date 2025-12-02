import type { action } from "@/entities/record";

export function returnColorOfAction(a: action): string {
  switch (a) {
    case "LOGIN":
      return "bg-blue-100 text-blue-800";
    case "LOGOUT":
      return "bg-purple-100 text-purple-800";
    case "CREATE":
      return "bg-green-100 text-green-800";
    case "UPDATE":
      return "bg-yellow-100 text-yellow-800";
    case "DELETE":
      return "bg-red-100 text-red-800";
    case "OTHER":
      return "bg-gray-100 text-gray-800";
    default:
      return "";
  }
}
