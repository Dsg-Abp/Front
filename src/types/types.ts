export interface ApiError {
  response?: {
    status: number;
    data?: unknown;
  };
}