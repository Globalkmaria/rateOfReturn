import { useParams } from 'react-router-dom';

import { checkIfMainGroup } from '@/utils/group';

import { MAIN_GROUP_ID } from '@/features/groups/mockData';

function useIsMainGroup() {
  const { groupId = MAIN_GROUP_ID } = useParams();
  const isMainGroup = checkIfMainGroup(groupId);

  return isMainGroup;
}

export default useIsMainGroup;
