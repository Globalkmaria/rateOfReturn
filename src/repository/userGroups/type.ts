export type AddNewUserGroupRepReq = {
  group: {
    name: string;
    stocks: {
      [stockId: string]: string[];
    };
  };
};

export type AddNewUserGroupRepRes = {
  groupId: string;
};

export type PurchasedItemGroupRepReq = {
  groupId: string;
  stockId: string;
  purchasedId: string;
};
