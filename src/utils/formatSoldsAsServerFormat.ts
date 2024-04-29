import { SoldsState } from '@/features/solds';
import { UserSolds } from '@/repository/userData/type';

export const formatSoldAsServerFormat = (
  solds: SoldsState,
): UserSolds | null => {
  if (!solds?.list?.byId) return null;

  return solds.list.byId;
};
