import { useSelector } from 'react-redux';
import { selectGroups } from '../../../features/groups/selectors';
import { selectIsLoggedIn } from '../../../features/user/selectors';
import { useEffect } from 'react';
import { setLocalStorageItem } from '../../../utils/getLocalStorage';

const useSaveChangedGroupsData = (firstLoad: boolean) => {
  const groups = useSelector(selectGroups);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) return;
    if (!firstLoad) setLocalStorageItem('groups', groups);
  }, [groups.groups, isLoggedIn]);
};

export default useSaveChangedGroupsData;
