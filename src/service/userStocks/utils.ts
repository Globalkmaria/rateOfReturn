import {
  EditUserItemRepData,
  EditUserStockRepReq,
} from '../../repository/userStocks/type';
import { EditUserItemServiceData, EditUserStockServiceData } from './type';

export const renameStockKeysForServer = (
  data: EditUserStockServiceData,
): EditUserStockRepReq['data'] => {
  const mapKey = (
    sourceKey: keyof EditUserStockServiceData,
    targetKey: keyof EditUserStockRepReq['data'],
  ) => (data[sourceKey] !== undefined ? { [targetKey]: data[sourceKey] } : {});

  return {
    ...mapKey('stockName', 'name'),
    ...mapKey('currentPrice', 'currentPrice'),
    ...mapKey('tag', 'tag'),
  };
};

export const renameItemKeysForServer = (
  data: EditUserItemServiceData,
): EditUserItemRepData => {
  const mapKey = (
    sourceKey: keyof EditUserItemServiceData,
    targetKey: keyof EditUserItemRepData,
  ) => (data[sourceKey] !== undefined ? { [targetKey]: data[sourceKey] } : {});

  return {
    ...mapKey('purchasedDate', 'buyDate'),
    ...mapKey('purchasedTime', 'buyTime'),
    ...mapKey('purchasedQuantity', 'quantity'),
    ...mapKey('purchasedPrice', 'buyPrice'),
  };
};
