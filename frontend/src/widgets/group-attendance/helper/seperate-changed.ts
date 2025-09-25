import type { LessonRecord } from "./generate-table";

export function separeChanged(
  original: LessonRecord[],
  current: LessonRecord[]
): LessonRecord[] {
  const originalMap = new Map(original.map((l) => [l.date, l]));

  return current.filter((c) => {
    const o = originalMap.get(c.date);
    if (!o) {
      // brand new lesson → keep
      return true;
    }

    // check if any student changed
    const changed = c.students.some((cs) => {
      const os = o.students.find((os) => os.student === cs.student);
      return !os || os.present !== cs.present || os.grade !== cs.grade;
    });

    return changed;
  });
}
