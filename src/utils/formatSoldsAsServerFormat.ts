import { SoldsState } from '@/features/solds';
import { ReplaceUserDataRepReq } from '@/repository/userData/type';

export const formatSoldAsServerFormat = (
  solds: SoldsState,
): ReplaceUserDataRepReq['solds'] | null => {
  if (!solds?.list?.byId) return null;

  return {
    solds: solds.list.byId,
    nextId: solds.nextId,
  };
};
