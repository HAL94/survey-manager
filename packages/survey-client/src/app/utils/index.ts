export const BASE_URI = 'http://localhost:5000/api/v1/';
export interface Survey {
  id: number;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface Response<T = unknown> {
  success: boolean;
  result: T;
  error: any;
}
