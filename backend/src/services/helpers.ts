export function filterout<T extends object>(a: T, ...b: string[]): Partial<T> {
  for (const [key] of Object.entries(a)) {
    if (b.includes(key)) {
      delete (a as any)[key];
    }
  }
  return a;
}

export function getDateRange(date: Date, period: string): { start: Date; end: Date } {
  let start = new Date(date);
  let end = new Date(date);

  if (period === "month") {
    start = new Date(date.getFullYear(), date.getMonth(), 1);
    end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  } else if (period === "week") {
    const day = date.getDay(); // Sunday = 0
    start.setDate(date.getDate() - day);
    start.setHours(0, 0, 0, 0);
    end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else {
    // day by default
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
}
