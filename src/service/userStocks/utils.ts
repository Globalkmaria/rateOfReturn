import {
  EditUserItemRepData,
  EditUserStockRepReq,
} from '../../repository/userStocks/type';
import { generateDataEntry } from '../utils';
import { EditUserItemServiceData, EditUserStockServiceData } from './type';
import { localStringToNumber } from '@/utils';

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
