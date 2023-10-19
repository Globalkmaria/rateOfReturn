import { useSelector } from 'react-redux';
import { selectIsMainGroupSelected } from '../../../features/groups/selectors';
import { selectStockIds } from '../../../features/selectors';

export function useShowAddSampleBtn() {
  const isMainGroup = useSelector(selectIsMainGroupSelected);
  const noUserStockData = useSelector(selectStockIds()).length === 0;
  const showBtn = isMainGroup && noUserStockData;

  return [showBtn];
}
