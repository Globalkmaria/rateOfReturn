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
