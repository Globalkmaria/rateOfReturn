export interface Result {
  success: boolean;
  message?: string;
}
export interface ResultWithData<T> {
  data?: T;
  success: boolean;
  message?: string;
}
