import { CurrentPriceChanges } from '@/views/List/StockListContent/StockTableMenu/EditCurrentPrice/EditCurrentPriceModal';

import { localStringToNumber } from '@/utils';

import {
  EditCurrentPricesRepReq,
  EditUserItemRepData,
  EditUserStockRepReq,
} from '../../repository/userStocks/type';
import { generateDataEntry } from '../utils';
import { EditUserItemServiceData, EditUserStockServiceData } from './type';

export const renameStockKeysForServer = (
  data: EditUserStockServiceData,
): EditUserStockRepReq['data'] => {
  const mapFn = generateDataEntry<
    EditUserStockServiceData,
    EditUserStockRepReq['data']
  >(data);

  return {
    ...mapFn('stockName', 'name'),
    ...mapFn('currentPrice', 'currentPrice'),
    ...mapFn('tag', 'tag'),
  };
};

export const getEditUserItemRepData = (
  changedInputs: EditUserItemServiceData,
): EditUserItemRepData => {
  const mapFn = generateDataEntry<EditUserItemServiceData, EditUserItemRepData>(
    changedInputs,
  );

  return {
    ...mapFn('purchasedDate', 'buyDate'),
    ...mapFn('purchasedTime', 'buyTime'),
    ...mapFn('purchasedPrice', 'buyPrice', localStringToNumber),
    ...mapFn('purchasedQuantity', 'quantity', localStringToNumber),
  };
};

export const generateServerCurrentPrices = (
  data: CurrentPriceChanges,
): EditCurrentPricesRepReq => {
  return Object.entries(data).reduce((acc, [id, value]) => {
    acc[id] = localStringToNumber(value);
    return acc;
  }, {} as EditCurrentPricesRepReq);
};
