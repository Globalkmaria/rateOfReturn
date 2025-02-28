import {
  SOLD_DATA_INITIAL_STATE_WITH_SAMPLE,
  SoldsState,
} from '@/features/solds';

import { SoldItemInputs } from '@/views/Sold/Table/SoldItem';

import { ReplaceUserDataRepReq, UserSolds } from '@/repository/userData/type';
import { EditSoldsRepReq } from '@/repository/userSolds';
import { localStringToNumber } from '@/utils';

import { generateDataEntry } from '../utils';

export const generateEditUserSoldRepData = (
  changedInputs: SoldItemInputs,
): EditSoldsRepReq['data'] => {
  const { soldPrice, ...restProps } = changedInputs;
  const mapFn = generateDataEntry<SoldItemInputs, EditSoldsRepReq['data']>(
    changedInputs,
  );

  return {
    ...restProps,
    ...mapFn('soldPrice', 'soldPrice', localStringToNumber),
  };
};

export const soldListToServerFormat = (soldList: SoldsState['list']) => {
  return soldList.allIds.reduce((acc, id) => {
    acc[id] = {
      ...soldList.byId[id],
      soldPrice: localStringToNumber(soldList.byId[id].soldPrice),
    };

    return acc;
  }, {} as UserSolds);
};

export const getSoldServerSampleData = (): Pick<
  ReplaceUserDataRepReq,
  'solds'
> => {
  const solds = soldListToServerFormat(
    SOLD_DATA_INITIAL_STATE_WITH_SAMPLE.list,
  );

  return {
    solds: {
      solds,
      nextId: SOLD_DATA_INITIAL_STATE_WITH_SAMPLE.nextId,
    },
  };
};
