import { client } from "../client";
import type { LessonResponse, LessonsResponse } from "../types/lesson";

export function getLessons(id:string){
  return client<LessonsResponse>(`/v1/lessons/group/${id}`, {method: "GET"})
}

export function createLesson(body: unknown){
  return client<LessonResponse>("/v1/lessons", {method: "POST", body: JSON.stringify(body)})
} 

export function getLesson(id:string){
  return client<LessonResponse>(`/v1/lessons/${id}`, {method: "GET"})
}

export function updateLesson(id:string, body:unknown){
  return client<LessonResponse>(`/v1/lessons/${id}`, {method: "POST", body: JSON.stringify(body)})
}

export function deleteLessons(id:string[]){
  return client("/v1/lessons", {method: "DELETE", body: JSON.stringify({id})})
}
