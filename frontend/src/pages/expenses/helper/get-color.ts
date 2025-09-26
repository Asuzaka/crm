export function getColorOfCategory(a: string) {
  switch (a) {
    case "salaries":
      return "bg-blue-100 text-blue-800";
    case "equipment":
      return "bg-green-100 text-green-800";
    case "rent":
      return "bg-yellow-100 text-yellow-800";
    case "utilities":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
