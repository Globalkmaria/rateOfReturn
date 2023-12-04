export const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key);
  if (item) return JSON.parse(item);

  return null;
};

export const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
