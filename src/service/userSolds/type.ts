import { EditSoldsRepReq } from '@/repository/userSolds';
import { SoldItemInputs } from '@/views/Sold/Table/SoldItem';

export type EditSoldServiceReq = Omit<EditSoldsRepReq, 'data'> & {
  data: SoldItemInputs;
};
