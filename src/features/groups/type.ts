import { Collections } from '../../typeUtils/typeGenerators';

export type Group = {
  groupId: string;
  groupName: string;
  stocks: { byId: { [stockId: string]: string[] }; allIds: string[] };
};

export type Groups = Collections<Group>;

export interface GroupsState {
  groups: Groups;
  nextGroupId: number;
}

export type UpdateMainGroupPayload = {
  type: 'stock' | 'purchase';
  stockId: string;
  purchasedId: string;
};
