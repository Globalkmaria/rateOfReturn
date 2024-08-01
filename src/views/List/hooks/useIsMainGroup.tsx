import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { checkIfMainGroup } from '@/utils/group';
import { useParams } from 'react-router-dom';

function useIsMainGroup() {
  const { groupId = MAIN_GROUP_ID } = useParams();
  const isMainGroup = checkIfMainGroup(groupId);

  return isMainGroup;
}

export default useIsMainGroup;
