import React, { memo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import Select from '../../../components/Select';
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

  const onGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateCheckedItems({ type: 'all', checked: true }));
    navigate(`groups/${e.target.value}`);
  };

  return (
    <StyledGroupButtons>
      <Select
        onChange={onGroupChange}
        width={140}
        height={40}
        initialValue={groupId}
        options={options}
        value={groupId}
        title='Choose group to show'
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
