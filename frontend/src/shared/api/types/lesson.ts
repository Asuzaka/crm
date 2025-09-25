import type { Lesson } from "../../../entities/lesson/model/types";

export interface LessonsResponse {
  status: string;
  data: Lesson[];
}

export interface LessonResponse {
  status: string;
  data: Lesson;
}
