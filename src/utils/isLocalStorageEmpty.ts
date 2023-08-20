export const isLocalStorageEmpty = (): boolean => {
  const stocks = localStorage.getItem('stockList') || '';
  const groups = localStorage.getItem('groups') || '';
  if (!groups && !stocks) return true;

  return false;
};
