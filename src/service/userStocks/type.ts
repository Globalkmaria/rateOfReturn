import { PurchasedItemInfo } from '../../features/stockList/type';
import { EditUserItemRepReq } from '../../repository/userStocks/type';

export type EditUserStockServiceData = {
  stockName?: string;
  currentPrice?: number;
  tag?: string;
};

export type EditUserStockServiceReq = {
  data: EditUserStockServiceData;
  stockId: string;
};

export type EditUserItemServiceData = Partial<
  Omit<PurchasedItemInfo, 'purchasedId' | 'needInit'>
>;

export type EditUserItemServiceReq = {
  data: EditUserItemServiceData;
} & Omit<EditUserItemRepReq, 'data'>;
