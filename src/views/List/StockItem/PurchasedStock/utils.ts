import { Group } from '@/features/groups/type';
import {
  PurchasedItemInfo,
  StockMainInfo,
} from '../../../../features/stockList/type';
import { getFixedLocaleString, localStringToNumber } from '@/utils';
import { EditUserItemServiceData } from '@/service/userStocks/type';

export const getPurchasedData = ({
  purchasedItem,
  mainInfo,
}: {
  purchasedItem: PurchasedItemInfo;
  mainInfo: StockMainInfo;
}) => {
  const purchasedQuantity = localStringToNumber(
    purchasedItem.purchasedQuantity,
  );
  const purchasedPrice = localStringToNumber(purchasedItem.purchasedPrice);
  const currentPrice = localStringToNumber(mainInfo.currentPrice);

  const totalPurchasePrice = purchasedQuantity * purchasedPrice;
  const evaluationPrice = purchasedQuantity * currentPrice;
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
  changedInputs: EditUserItemServiceData,
): PurchasedItemInfo => ({
  ...purchasedItem,
  ...changedInputs,
  purchasedQuantity:
    changedInputs.purchasedQuantity === undefined
      ? purchasedItem.purchasedQuantity
      : changedInputs.purchasedQuantity || '0',
  purchasedPrice: getFixedLocaleString(
    changedInputs.purchasedPrice ?? purchasedItem.purchasedPrice,
  ),
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
