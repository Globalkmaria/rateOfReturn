import { memo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { selectGroups } from '../../../features/groups/selectors';
import { selectCheckedPurchasedItems } from '../../../features/checkedItems/selectors';
import { getOptions } from './utils';
import useModal from '../hooks/useModal';
import AddGroupModal from './AddGroupModal';
import DeleteGroupModal from './DeleteGroupModal';
import IconButton from '@/components/IconButton';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { updateCheckedItems } from '@/features/checkedItems/checkedItemsSlice';
import { checkIfMainGroup } from '@/utils/group';
import RadioSelect from '@/components/RadioSelect';

const GroupButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupId = MAIN_GROUP_ID } = useParams();

  const {
    showModal: showAdd,
    onOpenModal: onOpenAdd,
    onCloseModal: onCloseAdd,
  } = useModal();
  const {
    showModal: showDelete,
    onOpenModal: onOpenDelete,
    onCloseModal: onCloseDelete,
  } = useModal();

  const isMainGroupSelected = checkIfMainGroup(groupId);
  const groups = useSelector(selectGroups);
  const checkedItems = useSelector(selectCheckedPurchasedItems);
  const options = getOptions(groups);
  const showAddGroup = !!checkedItems.length;
  const noGroups = !groups.groups.allIds.length;

  const onSelectClick = (value: string) => {
    dispatch(updateCheckedItems({ type: 'all', checked: true }));
    navigate(`groups/${value}`);
  };

  return (
    <StyledGroupButtons>
      <RadioSelect
        title='Switch groups'
        value={groupId}
        options={options}
        onClick={onSelectClick}
      />
      <Buttons>
        {showAdd && <AddGroupModal onClose={onCloseAdd} />}
        <IconButton
          title='Delete group'
          size='m'
          onClick={onOpenDelete}
          disabled={noGroups}
          icon='folderDelete'
        />
        {isMainGroupSelected && (
          <IconButton
            icon='folderAdd'
            onClick={onOpenAdd}
            disabled={!showAddGroup}
            title='Add new group'
            size='m'
          />
        )}
        {showDelete && <DeleteGroupModal onClose={onCloseDelete} />}
      </Buttons>
    </StyledGroupButtons>
  );
};

export default memo(GroupButtons);

const StyledGroupButtons = styled('div')`
  display: flex;
  gap: 10px;
`;

const Buttons = styled('div')`
  display: flex;
`;
