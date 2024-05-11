import {
  getAverage,
  getFixedLocaleString,
  getPercentage,
  localStringToNumber,
} from '@/utils/number';
import {
  PurchasedItemInfo,
  StockList,
  StockMainInfo,
} from '../../../features/stockList/type';
import { SummaryInfoData } from './SummaryInfo/SummaryInfo';
import { ChangedSummaryInputs } from './SummaryInfo/hooks/useStockSummaryInputChange';
import { EditUserStockServiceReq } from '@/service/userStocks/type';

const getPurchasedInfo = (data: StockList['purchasedItems'], id: string) =>
  data.byId[id];

export const getGroupPurchasedData = (
  originalPurchasedData: StockList['purchasedItems'],
  groupPurchasedIds: string[],
): StockList['purchasedItems'] => {
  const allIds = [...groupPurchasedIds];
  const byId = groupPurchasedIds.reduce<Record<string, PurchasedItemInfo>>(
    (acc, id) => {
      acc[id] = getPurchasedInfo(originalPurchasedData, id);
      return acc;
    },
    {},
  );

  return { allIds, byId };
};

const getQuantitySumAndTotalPrice = (
  purchasedItems: StockList['purchasedItems'],
): { purchaseQuantitySum: number; totalPurchasePrice: number } =>
  purchasedItems.allIds.reduce(
    (acc, id) => {
      const { purchasedQuantity = 0, purchasedPrice = 0 } =
        purchasedItems?.byId?.[id] || {};

      acc.purchaseQuantitySum += purchasedQuantity;
      acc.totalPurchasePrice += purchasedQuantity * purchasedPrice;
      return acc;
    },
    {
      purchaseQuantitySum: 0,
      totalPurchasePrice: 0,
    },
  );

export const getStockTotals = (
  stockInfo: StockList,
): Pick<SummaryInfoData, 'evaluationPrice' | 'totalPurchasePrice'> => {
  const { mainInfo, purchasedItems } = stockInfo;

  const { purchaseQuantitySum, totalPurchasePrice } =
    getQuantitySumAndTotalPrice(purchasedItems);

  const evaluationPrice =
    purchaseQuantitySum * localStringToNumber(mainInfo.currentPrice);

  return {
    evaluationPrice,
    totalPurchasePrice,
  };
};

export const getStockSummaryInfo = (
  stockInfo: StockList,
  isMainGroup: boolean,
  groupPurchasedIds?: string[],
): SummaryInfoData => {
  const { mainInfo } = stockInfo;
  const purchasedItems = isMainGroup
    ? stockInfo.purchasedItems
    : getGroupPurchasedData(stockInfo.purchasedItems, groupPurchasedIds || []);

  const { purchaseQuantitySum, totalPurchasePrice } =
    getQuantitySumAndTotalPrice(purchasedItems);

  const purchasePriceAverage = getAverage(
    totalPurchasePrice,
    purchaseQuantitySum,
  );
  const evaluationPrice =
    purchaseQuantitySum * localStringToNumber(mainInfo.currentPrice);
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const profitRate = getPercentage(evaluationProfit, totalPurchasePrice);

  return {
    purchaseQuantitySum,
    purchasePriceAverage,
    totalPurchasePrice,
    evaluationPrice,
    evaluationProfit,
    profitRate,
  };
};

export const getCurrentDateAndTime = () => {
  const dateTime = new Date();
  dateTime.setMinutes(dateTime.getMinutes() - dateTime.getTimezoneOffset());
  const isoString = dateTime.toISOString();

  const date = isoString.slice(0, 10);
  const time = isoString.slice(11, 16);

  return { date, time };
};

export const checkNoChange = (values: { [key: string]: any }) =>
  Object.keys(values).length === 0;

export const getChangedStockData = (
  changedInputs: ChangedSummaryInputs,
  mainInfo: StockMainInfo,
): StockMainInfo => {
  const currentPrice = getFixedLocaleString(
    changedInputs.currentPrice ?? mainInfo.currentPrice,
  );

  return { ...mainInfo, ...changedInputs, currentPrice, needInit: false };
};

export const getEditUserStockData = (
  changedInputs: ChangedSummaryInputs,
  mainInfo: StockMainInfo,
): Partial<EditUserStockServiceReq['data']> => {
  const currentPrice = changedInputs.currentPrice ?? mainInfo.currentPrice;
  const numCurrentPrice = localStringToNumber(currentPrice);

  return {
    stockName: changedInputs.stockName ?? mainInfo.stockName,
    tag: changedInputs.tag ?? mainInfo.tag,
    currentPrice: numCurrentPrice,
  };
};
