import { SoldItemInputs } from '@/views/Sold/Table/SoldItem';

import { EditSoldsRepReq } from '@/repository/userSolds';

export type EditSoldServiceReq = Omit<EditSoldsRepReq, 'data'> & {
  data: SoldItemInputs;
};
