export interface Activity {
  id?: number;
  name: string;
  description?: string;
  durationMinutes?: number;
}

export interface PageResult<T> {
  content: T[];
  totalElements: number;
}