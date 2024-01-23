import React, { memo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { BorderButton } from '../../../components/Button';
import Select from '../../../components/Select';
import { updateSelectedGroupId } from '../../../features/groups/groupsSlice';
import { selectGroups, selectIsMainGroupSelected } from '../../../features/groups/selectors';
import { updateCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { selectCheckedPurchasedItems } from '../../../features/checkedItems/selectors';
import { getOptions } from './utils';
import useModal from '../hooks/useModal';
import AddGroupModal from './AddGroupModal';
import DeleteGroupModal from './DeleteGroupModal';

const GroupButtons = () => {
  const dispatch = useDispatch();
  const { showModal: showAdd, onOpenModal: onOpenAdd, onCloseModal: onCloseAdd } = useModal();
  const { showModal: showDelete, onOpenModal: onOpenDelete, onCloseModal: onCloseDelete } = useModal();

  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const groups = useSelector(selectGroups);
  const checkedItems = useSelector(selectCheckedPurchasedItems);
  const options = getOptions(groups);
  const showAddGroup = !!checkedItems.length;
  const noGroups = groups.groups.allIds.length === 0;

  const onGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSelectedGroupId(e.target.value));
    dispatch(updateCheckedItems({ type: 'all', checked: true }));
  };

  return (
    <>
      <StyledGroupButtons>
        <Select
          onChange={onGroupChange}
          width={140}
          initialValue='1'
          options={options}
          value={groups.selectedGroupId}
          title='Choose group to show'
        />
        <Buttons>
          <BorderButton width={133} onClick={onOpenDelete} size='m' disabled={noGroups} title='Delete group'>
            Delete Group
          </BorderButton>
          {showDelete && <DeleteGroupModal onClose={onCloseDelete} />}
          {isMainGroupSelected && (
            <BorderButton width={113} onClick={onOpenAdd} size='m' disabled={!showAddGroup} title='Add new group'>
              Add Group
            </BorderButton>
          )}
          {showAdd && <AddGroupModal onClose={onCloseAdd} />}
        </Buttons>
      </StyledGroupButtons>
    </>
  );
};

export default memo(GroupButtons);

const StyledGroupButtons = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Buttons = styled('div')`
  display: flex;
  gap: 10px;
`;
