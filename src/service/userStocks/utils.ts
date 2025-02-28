import { PurchasedItemInfo } from '@/features/stockList/type';

import { CurrentPriceChanges } from '@/views/List/StockListContent/StockTableMenu/EditCurrentPrice/EditCurrentPriceModal';

import { localStringToNumber } from '@/utils';

import {
  EditCurrentPricesRepReq,
  EditUserStockItem,
} from '../../repository/userStocks/type';
import { generateDataEntry } from '../utils';

export const getEditUserItemRepData = (
  changedInputs: PurchasedItemInfo,
): EditUserStockItem => {
  const mapFn = generateDataEntry<PurchasedItemInfo, EditUserStockItem>(
    changedInputs,
  );

  const result = {
    ...mapFn('purchasedId', 'id'),
    ...mapFn('purchasedDate', 'buyDate'),
    ...mapFn('purchasedTime', 'buyTime'),
    ...mapFn('purchasedPrice', 'buyPrice', localStringToNumber),
    ...mapFn('purchasedQuantity', 'quantity', localStringToNumber),
  } as EditUserStockItem;

  return result;
};

export const generateServerCurrentPrices = (
  data: CurrentPriceChanges,
): EditCurrentPricesRepReq => {
  return Object.entries(data).reduce((acc, [id, value]) => {
    acc[id] = localStringToNumber(value);
    return acc;
  }, {} as EditCurrentPricesRepReq);
};
