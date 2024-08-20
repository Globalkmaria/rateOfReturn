import { Note, NotesState } from '@/features/notes';
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
  currentPrice: string;
  createdAt: Date;
  tag: string;
  id: string;
};

type UserStockInfo = Omit<StockInfo, 'currentPrice'> & {
  currentPrice: number;
};

export type UserStock = {
  info: UserStockInfo;
  items: {
    [itemId: string]: Item;
  };
  docId?: string;
};

export type UserStocks = {
  [stockId: string]: UserStock;
};

export type UserSold = Omit<Sold, 'soldPrice'> & {
  soldPrice: number;
};
export type UserSolds = {
  [soldId: string]: UserSold;
};

export type UserDataRepRes = {
  docId: string;
  stocks: {
    stocks: UserStocks;
    nextStockId: number;
    nextItemId: number;
    tags: string[];
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
  notes: {
    nextId: number;
    notes: Note[];
  };
};

export type ReplaceUserDataRepReq = {
  stocks: {
    stocks: UserStocks;
    nextStockId: number;
    nextItemId: number;
    tags: string[];
  };
  groups: {
    groups: UserGroups;
    nextGroupId: number;
  };
  solds: {
    solds: UserSolds;
    nextId: number;
  };
  notes: {
    notes: NotesState['collection']['byId'];
    nextId: number;
  };
};

export type MergeUserDataRepReq = {
  stocks:
    | ReplaceUserDataRepReq['stocks']
    | {
        [key: string]: never;
      };
  groups: UserGroups;
  solds: UserSolds;
};

export type AddCurrentPageSample = Pick<
  MergeUserDataRepReq,
  'groups' | 'stocks'
>;
