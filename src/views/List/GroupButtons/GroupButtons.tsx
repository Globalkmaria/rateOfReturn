import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { checkIfMainGroup } from '@/utils/group';

import { updateCheckedItems } from '@/features/checkedItems/checkedItemsSlice';
import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { selectIsStockListEditMode } from '@/features/temporalStockList/selectors';

import IconButton from '@/components/IconButton';
import RadioSelect from '@/components/RadioSelect';

import AddGroupModal from './AddGroupModal';
import DeleteGroupModal from './DeleteGroupModal';
import { getOptions } from './utils';
import { selectCheckedPurchasedItems } from '../../../features/checkedItems/selectors';
import { selectGroups } from '../../../features/groups/selectors';
import useModal from '../hooks/useModal';

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
  const isEditMode = useSelector(selectIsStockListEditMode);
  const options = getOptions(groups);
  const showAddGroup = !!checkedItems.length;
  const noGroups = !groups.groups.allIds.length;

  const onSelectClick = (value: string) => {
    if (isEditMode) {
      alert('You can not switch groups while in edit mode');
      return;
    }
    dispatch(updateCheckedItems({ type: 'all', checked: true }));
    navigate(`groups/${value}`);
  };

  return (
    <StyledGroupButtons>
      <RadioSelect
        size='m'
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
