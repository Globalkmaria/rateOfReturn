import { config } from '../../config';
import formatGroupAsServerFormat from '../../utils/formatGroupAsServerFormat';
import formatStockAsServerFormat from '../../utils/formatStockAsServerFormat';

const getLocalStock = () => {
  const localStocks = localStorage.getItem('stockList');
  const stocks = localStocks ? formatStockAsServerFormat(JSON.parse(localStocks)) : null;

  return stocks?.stocks;
};

const getLocalGroup = () => {
  const localGroups = localStorage.getItem('groups');
  const groups = localGroups ? formatGroupAsServerFormat(JSON.parse(localGroups)) : null;

  return groups?.groups;
};

export const getLocalStockAndGroup = () => {
  return {
    stocks: getLocalStock() || {},
    groups: getLocalGroup() || {},
  };
};

export const changeImgUrl = (imgURL: string) => `${config.server.url}/img/${imgURL}`;
