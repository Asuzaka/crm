import { client } from "../client";
import type { ILesson, Lesson } from "../../../entities/lesson";
import type { LessonResponse, LessonsResponse } from "../types/lesson";

export function getLessons(id: string, date: string) {
  return client<LessonsResponse>(`/v1/lessons/group/${id}?date=${date}`, {
    method: "GET",
  });
}

export function getLesson(id: string) {
  return client<LessonResponse>(`/v1/lessons/${id}`, { method: "GET" });
}

export function createLessons(body: ILesson[]) {
  return client<LessonResponse>("/v1/lessons", {
    method: "POST",
    body: JSON.stringify({ lessons: body }),
  });
}

export function updateLessons(body: Lesson[]) {
  return client<LessonResponse>("/v1/lessons/", {
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
