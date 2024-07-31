import { selectIsMainGroupSelected } from '@/features/groups/selectors';
import { selectStockIds } from '@/features/selectors';
import { useSelector } from 'react-redux';

export function useShowAddSampleBtn() {
  const isMainGroup = useSelector(selectIsMainGroupSelected);
  const noUserStockData = useSelector(selectStockIds).length === 0;
  const showBtn = isMainGroup && noUserStockData;

  return showBtn;
}
