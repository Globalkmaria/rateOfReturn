import { Item, StockInfo } from '../userData/type';

export type AddNewUserStockRepRes = { stockId: string; itemId: string };

export type EditUserStockRepReq = {
  stockId: string;
  data: Partial<Omit<StockInfo, 'createdAt' | 'id'>>;
};

export type AddNewUserItemRepRes = { stockId: string; itemId: string };

export type EditUserItemRepData = Partial<
  Omit<Item, 'id' | 'createdAt' | 'docId' | 'buyDate'>
> & {
  buyDate?: string;
};

export type EditUserItemRepReq = {
  stockId: string;
  itemId: string;
  data: EditUserItemRepData;
};

export type DeleteUserItemRepReq = {
  stockId: string;
  itemId: string;
};
