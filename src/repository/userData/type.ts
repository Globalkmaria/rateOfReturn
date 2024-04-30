import { Sold } from '@/features/solds';

export type UserGroup = {
  id: string;
  name: string;
  stocks: {
    [key: string]: string[];
  };
  docId?: string;
};

export type UserGroups = {
  [groupId: string]: UserGroup;
};

export type Item = {
  id: string;
  buyDate: Date;
  buyTime: string;
  quantity: number;
  buyPrice: number;
  createdAt: Date;
  docId?: string;
};

export type StockInfo = {
  name: string;
  currentPrice: number;
  createdAt: Date;
  id: string;
};

export type UserStock = {
  info: StockInfo;
  items: {
    [itemId: string]: Item;
  };
  docId?: string;
};

export type UserStocks = {
  [stockId: string]: UserStock;
};

export type UserSold = Sold;
export type UserSolds = {
  [soldId: string]: UserSold;
};

export type UserDataRepRes = {
  docId: string;
  stocks: {
    stocks: UserStocks;
    nextStockId: number;
    nextItemId: number;
    docId: string;
  };
  groups: {
    groups: UserGroups;
    nextGroupId: number;
    docId: string;
  };
  solds: {
    solds: UserSolds;
    nextId: number;
  };
};

export type ReplaceUserDataRepReq = {
  stocks: {
    stocks: UserStocks;
    nextStockId: number;
    nextItemId: number;
  };
  groups: {
    groups: UserGroups;
    nextGroupId: number;
  };
  solds: {
    solds: UserSolds;
    nextId: number;
  };
};

export type mergeUserDataRepReq = {
  stocks: UserStocks;
  groups: UserGroups;
  solds: UserSolds;
};
