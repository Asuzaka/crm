import type { Lesson } from "../../../entities/lesson/model/types";

export interface getLessonsType {
  status: string;
  data: Lesson[];
}

export interface getLessonType {
  status: string;
  data: Lesson;
}
