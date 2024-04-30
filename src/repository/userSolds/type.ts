import { UserSold } from '../userData/type';

export type NewSold = Omit<UserSold, 'soldTime' | 'soldDate' | 'id'>;

export type AddNewSoldsRepReq = {
  date: string;
  time: string;
  solds: NewSold[];
};

export type EditSoldsRepReq = {
  id: string;
  data: Partial<Pick<UserSold, 'soldTime' | 'soldDate' | 'soldPrice'>>;
};
