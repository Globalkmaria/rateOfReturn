import { Item, UserStockInfo } from '../userData/type';

export type AddNewUserStockRepReq = {
  date: string;
  time: string;
};
export type AddNewUserStockRepRes = { stockId: string; itemId: string };

export type AddNewUserItemRepReq = {
  stockId: string;
  date: string;
  time: string;
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
  purchasedId: string;
};

export type DeleteUserItemWithStockRepReq = DeleteUserItemRepReq & {
  isOnlyItem: boolean;
};

export type EditCurrentPricesRepReq = {
  [key: string]: number;
};

export type EditUserStockItem = Omit<
  Item,
  'docId' | 'createdAt' | 'buyDate'
> & {
  buyDate: string;
};

export type EditUserStockRepReq = {
  [stockId: string]: {
    info?: Omit<UserStockInfo, 'createdAt'>;
    items?: {
      [itemId: string]: EditUserStockItem;
    };
  };
};
