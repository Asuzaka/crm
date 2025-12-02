import type { SearchType } from "@/shared/ui";

export interface StandardApiType {
  status: string;
}

export interface ExtendedApiType extends StandardApiType {
  results: number;
  documents: number;
  pages: number;
}

export interface SearchResulType extends StandardApiType {
  data: SearchType[];
}
