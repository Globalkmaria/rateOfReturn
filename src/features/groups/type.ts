import { Collections } from '../../typeUtils/typeGenerators';

export type Group = {
  groupId: string;
  groupName: string;
  stocks: { byId: { [stockId: string]: string[] }; allIds: string[] };
};

export type Groups = Collections<Group>;

export interface GroupsState {
  groups: Groups;
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
