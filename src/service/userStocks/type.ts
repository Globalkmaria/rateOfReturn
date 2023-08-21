import {
  PurchasedItemInfo,
  StockMainInfo,
} from '../../features/stockList/type';
import {
  EditUserItemRepReq,
  EditUserStockRepReq,
} from '../../repository/userStocks/type';

export type EditUserStockServiceData = Partial<Omit<StockMainInfo, 'stockId'>>;

export type EditUserStockServiceReq = {
  data: EditUserStockServiceData;
} & Omit<EditUserStockRepReq, 'data'>;

export type EditUserItemServiceData = Partial<
  Omit<PurchasedItemInfo, 'purchasedId'>
>;

export type EditUserItemServiceReq = {
  data: EditUserItemServiceData;
} & Omit<EditUserItemRepReq, 'data'>;
