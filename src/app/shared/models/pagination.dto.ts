export interface PaginationDto {
  page?: number;
  limit?: number;
}

export interface PaginationResponse<T> {
  records: any;
  total: number;
}