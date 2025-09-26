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
