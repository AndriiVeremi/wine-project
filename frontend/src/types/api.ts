export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Array<{ message: string }>;
    };
    status?: number;
  };
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
}
