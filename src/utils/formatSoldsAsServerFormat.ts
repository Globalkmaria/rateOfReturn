import { soldListToServerFormat } from '@/service/userSolds/utils';

import { SoldsState } from '@/features/solds';

import { ReplaceUserDataRepReq } from '@/repository/userData/type';

export const formatSoldAsServerFormat = (
  solds: SoldsState,
): ReplaceUserDataRepReq['solds'] | null => {
  if (!solds?.list?.byId) return null;

  return {
    solds: soldListToServerFormat(solds.list),
    nextId: solds.nextId,
  };
};
