export type UserGroup = {
  id: string;
  name: string;
  stocks: {
    [key: string]: string[];
  };
  docId: string;
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
  docId: string;
};

export type StockInfo = {
  name: string;
  currentPrice: number;
  createdAt: Date;
};

export type UserStock = {
  info: StockInfo;
  items: {
    [itemId: string]: Item;
  };
  id: string;
  docId: string;
};

export type UserStocks = {
  [stockId: string]: UserStock;
};

export type UserDataRepRes = {
  docId: string;
  stocks: {
    stocks: UserStocks;
    docId: string;
  };
  groups: {
    groups: UserGroups;
    docId: string;
  };
};
