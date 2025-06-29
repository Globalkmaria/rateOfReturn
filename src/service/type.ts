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
  | { data: T; success: true }
  | { success: false; message: string };
