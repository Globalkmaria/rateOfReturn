import React from 'react';
import styled from 'styled-components';
import { BorderButton } from '../../../components/Button';
import Select from '../../../components/Select';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedGroupId } from '../../../features/groups/groupsSlice';
import {
  selectGroups,
  selectIsMainGroupSelected,
} from '../../../features/groups/selectors';
import { getOptions } from './utils';
import { updateCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { openStockModal } from '../../../features/stockModal/stockModalSlice';

type ModalMode = 'AddGroupModal' | 'DeleteGroupModal';

const GroupButtons = () => {
  const dispatch = useDispatch();
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const groups = useSelector(selectGroups);
  const options = getOptions(groups);
  const noGroups = groups.groups.allIds.length === 0;

  const onGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSelectedGroupId(e.target.value));
    dispatch(updateCheckedItems({ type: 'all', checked: true }));
  };
  const onOpenModal = (mode: ModalMode) => {
    dispatch(
      openStockModal({
        modalName: mode,
      }),
    );
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
        <div className='btns'>
          <BorderButton
            onClick={() => onOpenModal('AddGroupModal')}
            size='m'
            disabled={!isMainGroupSelected}
            title='Add new group'
          >
            Add Group
          </BorderButton>
          <BorderButton
            onClick={() => onOpenModal('DeleteGroupModal')}
            size='m'
            disabled={noGroups}
            title='Delete group'
          >
            Delete Group
          </BorderButton>
        </div>
      </StyledGroupButtons>
    </>
  );
};

export default GroupButtons;

const StyledGroupButtons = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  .btns {
    display: flex;
    gap: 10px;
  }
`;
