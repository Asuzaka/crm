import type { ILesson, Lesson } from "../../../entities/lesson";
import type { getLessonsType, getLessonType } from "../model/types";
import { client } from "../../../shared/api/client";

export function getLessons(id: string, date: string) {
  return client<getLessonsType>(`/v1/lessons/group/${id}?date=${date}`, {
    method: "GET",
  });
}

export function getLesson(id: string) {
  return client<getLessonType>(`/v1/lessons/${id}`, { method: "GET" });
}

export function createLessons(body: ILesson[]) {
  return client<getLessonType>("/v1/lessons", {
    method: "POST",
    body: JSON.stringify({ lessons: body }),
  });
}

export function updateLessons(body: Lesson[]) {
  return client<getLessonType>("/v1/lessons/", {
    method: "PATCH",
    body: JSON.stringify({ lessons: body }),
  });
}

export function deleteLessons(id: string[]) {
  return client("/v1/lessons", {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
}
