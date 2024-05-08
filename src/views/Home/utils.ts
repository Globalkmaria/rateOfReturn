import { formatSoldAsServerFormat } from '@/utils/formatSoldsAsServerFormat';
import { config } from '../../config';
import formatGroupAsServerFormat from '../../utils/formatGroupAsServerFormat';
import formatStockAsServerFormat from '../../utils/formatStockAsServerFormat';

const getLocalStock = () => {
  const localStocks = localStorage.getItem('stockList');
  const stocks = localStocks
    ? formatStockAsServerFormat(JSON.parse(localStocks))
    : null;

  return stocks;
};

const getLocalGroup = () => {
  const localGroups = localStorage.getItem('groups');
  const groups = localGroups
    ? formatGroupAsServerFormat(JSON.parse(localGroups))
    : null;

  return groups?.groups;
};

const getLocalSold = () => {
  const localSolds = localStorage.getItem('solds');
  const solds = localSolds
    ? formatSoldAsServerFormat(JSON.parse(localSolds))
    : null;

  return solds;
};

const STOCK_INIT = {
  stocks: {},
  nextStockId: 1,
  nextPurchasedId: 1,
  tags: [],
};

export const getLocalState = () => {
  const localStocks = getLocalStock();
  const stocks = localStocks ? { ...STOCK_INIT, ...localStocks } : {};
  return {
    stocks,
    groups: getLocalGroup() || {},
    solds: getLocalSold() || {},
  };
};

export const changeImgUrl = (imgURL: string) =>
  imgURL && `${config.server.url}/img/${imgURL}`;
