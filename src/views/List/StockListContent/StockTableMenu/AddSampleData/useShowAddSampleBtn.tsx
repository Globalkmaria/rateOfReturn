import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { checkIfMainGroup } from '@/utils/group';

import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { selectStockIds } from '@/features/selectors';

export function useShowAddSampleBtn() {
  const { groupId = MAIN_GROUP_ID } = useParams();
  const isMainGroup = checkIfMainGroup(groupId);

  const noUserStockData = useSelector(selectStockIds(groupId)).length === 0;
  const showBtn = isMainGroup && noUserStockData;

  return showBtn;
}
