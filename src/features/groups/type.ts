export type Group = {
  groupId: string;
  groupName: string;
  stocks: { byId: { [stockId: string]: string[] }; allIds: string[] };
};

export interface GroupsState {
  groups: { byId: { [groupId: string]: Group }; allIds: string[] };
  selectedGroupId: string;
  nextGroupId: number;
}

export type AddGroupPayload = {
  groupInfo: Group;
  groupId: string;
};

export type DeletePurchaseItemFromGroupPayload = {
  stockId: string;
  purchasedId: string;
};
export type UpdateMainGroupPayload = {
  type: 'stock' | 'purchase';
  stockId: string;
  purchasedId: string;
};
