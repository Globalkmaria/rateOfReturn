import { PurchasedItemInfo } from '../../features/stockList/type';
import { EditUserItemRepReq } from '../../repository/userStocks/type';
//
export type EditUserItemServiceData = Partial<
  Omit<PurchasedItemInfo, 'purchasedId' | 'needInit'>
>;

export type EditUserItemServiceReq = {
  data: EditUserItemServiceData;
} & Omit<EditUserItemRepReq, 'data'>;
