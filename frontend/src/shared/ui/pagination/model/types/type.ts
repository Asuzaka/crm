export interface PaginationProps {
  totalPages: number;
  totalItems: number;
  limit?: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
