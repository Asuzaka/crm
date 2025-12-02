import type { LessonRecord } from "./generate-table";

export function separateChanged(
  original: LessonRecord[],
  current: LessonRecord[]
): { toUpdate: LessonRecord[]; toCreate: LessonRecord[] } {
  // Step 1: Build a map of originals by date
  const originalMap = new Map(original.map((l) => [l.date, l]));

  // Step 2: Keep only lessons with at least one "valid" student entry
  const meaningful = current.filter((lesson) => lesson.students.some((s) => s.present !== null || s.grade !== null));

  const changed: LessonRecord[] = [];

  // Step 3: Compare with originals
  for (const c of meaningful) {
    const o = originalMap.get(c.date);

    if (!o) {
      // brand new lesson (not in original) → keep
      changed.push(c);
      continue;
    }

    // Check if any student differs
    const hasChanges = c.students.some((cs) => {
      const os = o.students.find((s) => s.student === cs.student);
      return !os || os.present !== cs.present || os.grade !== cs.grade;
    });

    if (hasChanges) {
      // preserve _id from original if missing
      if (!c._id && o._id) {
        c._id = o._id;
      }
      changed.push(c);
    }
  }

  // Step 4: Split into update vs create
  const toUpdate = changed.filter((c) => c._id);
  const toCreate = changed.filter((c) => !c._id);

  return { toUpdate, toCreate };
}
