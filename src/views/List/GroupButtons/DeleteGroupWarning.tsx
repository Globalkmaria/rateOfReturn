import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import userGroupsService from '@/service/userGroups/userGroups';

import { deleteGroup } from '@/features/groups/groupsSlice';
import { selectIsLoggedIn } from '@/features/user/selectors';

import DeleteWarningModal from '../../../components/DeleteWarningModal';

type Props = {
  onClose: () => void;
  groupId: string;
};

const DeleteGroupWarning = ({ onClose, groupId }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLoggedIn);

  const onDelete = async () => {
    if (isLogin) {
      const result = await userGroupsService.deleteUserGroup(groupId);
      if (!result.success) return;
    }

    dispatch(deleteGroup(groupId));
    navigate('/portfolio');
    onClose();
  };

  return (
    <DeleteWarningModal
      onClose={onClose}
      onDelete={onDelete}
      message={MESSAGE}
    />
  );
};

export default DeleteGroupWarning;

const MESSAGE = `Are you sure you want to delete this group?`;
