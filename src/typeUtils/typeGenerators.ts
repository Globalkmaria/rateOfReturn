export type Collections<T> = {
  byId: { [key: string]: T };
  allIds: string[];
};
