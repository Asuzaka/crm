export interface ILesson {
  group: string;
  teacher: string;
  date: string;
  students: {
    student: string;
    present: boolean | null;
    grade: number | null;
  }[];
}

export interface Lesson extends ILesson {
  _id: string;
}

// API
import type { StandardApiType } from "../../../shared/api/types";

export interface getLessonsType extends StandardApiType {
  data: Lesson[];
}

export interface getLessonType extends StandardApiType {
  data: Lesson;
}
