export interface ILesson {
  group: string;
  teacher: string;
  date: Date;
  students: {
    student: string;
    present: boolean;
    grade?: number;
  }[]
}

export interface Lesson extends ILesson {
  _id: string;
}
