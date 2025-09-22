import type { Lesson } from "../../../entities/lesson/model/types";

export interface LessonsResponse {
  status: string;
  data: Lesson[];
  results: number;
  documents: number;
  pages: number;
}

export interface LessonResponse {
  status: string;
  data: Lesson;
}
