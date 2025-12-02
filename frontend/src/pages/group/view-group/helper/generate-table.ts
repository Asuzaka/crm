import { startOfMonth, endOfMonth, eachDayOfInterval, getDay, format } from "date-fns";

const dayMap: { [key: string]: number } = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

interface Student {
  _id: string;
  name: string;
}

export interface LessonRecord {
  _id?: string;
  group: string;
  teacher: string;
  date: string; // yyyy-MM-dd
  students: {
    student: string; // studentId
    present: boolean | null;
    grade: number | null;
  }[];
}

export function generateLessons(
  teacher: string,
  group: string,
  schedule: { days: string[] },
  students: Student[],
  month: number, // 1-12
  year: number
): LessonRecord[] {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(new Date(year, month - 1));
  const allDays = eachDayOfInterval({ start, end });

  const scheduleDayNumbers = schedule.days.map((d) => dayMap[d]);

  const lessons: LessonRecord[] = allDays
    .filter((day) => scheduleDayNumbers.includes(getDay(day)))
    .map((day) => ({
      teacher: teacher,
      group: group,
      date: format(day, "yyyy-MM-dd"),
      students: students.map((s) => ({
        student: s._id,
        present: null,
        grade: null,
      })),
    }));

  return lessons;
}
