import { PurchasedItemInfo } from '../../features/stockList/type';

export type EditUserItemServiceData = Partial<
  Omit<PurchasedItemInfo, 'purchasedId'>
>;
