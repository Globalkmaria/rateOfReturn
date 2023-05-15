import React, { useState } from 'react';
import styled from 'styled-components';
import { BorderButton } from '../../../components/Button';
import Select from '../../../components/Select';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGroups,
  selectIsMainGroupSelected,
  updateSelectedGroupId,
} from '../../../features/groups/groupsSlice';
import { getOptions } from './utils';
import AddGroupModal from './AddGroupModal';
import { updateCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import DeleteGroupModal from './DeleteGroupModal';

type ModalMode = 'add' | 'edit' | 'delete';

const GroupButtons = () => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState<ModalMode>('add');
  const [isOpen, setIsOpen] = useState(false);
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const groups = useSelector(selectGroups);
  const options = getOptions(groups);
  const noGroups = groups.groups.allIds.length === 1;
  const Modal = mode === 'add' ? AddGroupModal : DeleteGroupModal;

  const onClose = () => setIsOpen(false);

  const onGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSelectedGroupId(e.target.value));
    dispatch(updateCheckedItems({ type: 'all', checked: true }));
  };
  const onOpenModal = (mode: ModalMode) => {
    setIsOpen(true);
    setMode(mode);
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
        <BorderButton
          onClick={() => onOpenModal('add')}
          size='m'
          disabled={!isMainGroupSelected}
          title='Add new group'
        >
          Add Group
        </BorderButton>
        {/* <BorderButton size='m' disabled={isMainGroupSelected}>
          Edit Group
        </BorderButton> */}
        <BorderButton
          onClick={() => onOpenModal('delete')}
          size='m'
          disabled={noGroups}
          title='Delete group'
        >
          Delete Group
        </BorderButton>
      </StyledGroupButtons>
      <Modal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default GroupButtons;

const StyledGroupButtons = styled('div')`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;
