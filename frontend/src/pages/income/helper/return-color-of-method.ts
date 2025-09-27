export function returnColorOfMethod(a: "cash" | "card" | "bank") {
  switch (a) {
    case "bank":
      return "bg-purple-100 text-purple-800";
    case "card":
      return "bg-blue-100 text-blue-800";
    case "cash":
      return "bg-green-100 text-green-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
}
