export interface getStatsType {
  status: string;
  data: {
    studentsCount: number;
    groupsCount: number;
    topGroups: { groupId: string; group: string; studentCount: number }[];
  };
}

export interface getStatsOfMoneyType {
  status: string;
  data: {
    month: number;
    income: number;
    expense: number;
  }[];
}

export interface getStatsOfMethodsType {
  status: string;
  data: { method: "bank" | "card" | "cash"; count: number; percent: number }[];
}
