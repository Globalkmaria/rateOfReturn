import { Group } from '@/features/groups/type';
import {
  PurchasedItemInfo,
  StockMainInfo,
} from '../../../../features/stockList/type';
import { ChangedPurchasedItemInputs } from './PurchasedStock';

export const getPurchasedData = ({
  purchasedItem,
  mainInfo,
}: {
  purchasedItem: PurchasedItemInfo;
  mainInfo: StockMainInfo;
}) => {
  const totalPurchasePrice =
    purchasedItem.purchasedQuantity * purchasedItem.purchasedPrice;
  const evaluationPrice =
    purchasedItem.purchasedQuantity * mainInfo.currentPrice;
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const formattedEvaluationProfit = evaluationProfit.toLocaleString();
  const profitRate = totalPurchasePrice
    ? (evaluationProfit / totalPurchasePrice) * 100
    : 0;
  const formattedProfitRate = `${profitRate.toFixed(2).toLocaleString()} %`;

  return {
    totalPurchasePrice,
    evaluationPrice,
    evaluationProfit,
    formattedEvaluationProfit,
    profitRate,
    formattedProfitRate,
  };
};

export const formatDateOrNumber = ({
  fieldName,
  value,
}: {
  fieldName: keyof Omit<PurchasedItemInfo, 'purchasedId'>;
  value: string;
}) => {
  if (fieldName === 'purchasedDate')
    return value.replace(/\:[\d]{2}.[\d]{3}Z/, '');
  return value.replaceAll(',', '');
};

export const getChangedPurchasedData = (
  purchasedItem: PurchasedItemInfo,
  changedInputs: ChangedPurchasedItemInputs,
): PurchasedItemInfo => ({
  ...purchasedItem,
  ...changedInputs,
  needInit: false,
});

export const checkPurchasedItemInGroup = (
  groupInfo: Group,
  stockId: string,
  purchasedId: string,
) => {
  return groupInfo.stocks.allIds.includes(stockId)
    ? groupInfo.stocks.byId[stockId].includes(purchasedId)
    : false;
};
