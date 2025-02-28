export type RequiredPick<T, K extends keyof T> = {
  [P in K]-?: NonNullable<T[P]>;
};
