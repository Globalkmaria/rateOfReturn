export type AddNewUserStockRepRes = { stockId: string; itemId: string };
export type AddNewUserItemRepRes = { stockId: string; itemId: string };

export type DeleteUserItemRepReq = {
  stockId: string;
  itemId: string;
};
