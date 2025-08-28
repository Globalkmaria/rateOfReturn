export interface Result {
  success: boolean;
  message?: string;
}
export interface ResultWithData<T> {
  data?: T;
  success: boolean;
  message?: string;
}

export type ResultWithData2<T> =
  | { success: true; data: T }
  | { success: false; message: string };
