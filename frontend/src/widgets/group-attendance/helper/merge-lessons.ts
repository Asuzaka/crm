import type { LessonRecord } from "./generate-table";

export function mergeLessons(
  existing: LessonRecord[],
  generated: LessonRecord[]
): LessonRecord[] {
  const existingMap = new Map(existing.map((l) => [l.date, l]));

  return generated.map((g) => {
    const existingLesson = existingMap.get(g.date);
    if (!existingLesson) return g; // new day → keep generated default

    // Merge students: preserve existing student data if present
    const mergedStudents = g.students.map((gs) => {
      const existingStudent = existingLesson.students.find(
        (es) => es.student === gs.student
      );
      return existingStudent
        ? { ...gs, ...existingStudent } // overwrite nulls with real values
        : gs;
    });

    return { ...g, students: mergedStudents };
  });
}
