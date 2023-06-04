import React, { useEffect, useState } from 'react';
import { ContainedButton } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addGroup } from '../../../features/groups/groupsSlice';
import { changeCheckInfoToGroupFormat } from './utils';
import { Input } from '../../../components/Input';
import { initCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { selectCheckedPurchasedItems } from '../../../features/checkedItems/selectors';
import { selectStocks } from '../../../features/stockList/selectors';
import GroupModalTable from './GroupModal/GroupModalTable';
import styled from 'styled-components';
import Modal from '../../../components/Modal';
import { closeStockModal } from '../../../features/stockModal/stockModalSlice';

const AddGroupModal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const checkedItems = useSelector(selectCheckedPurchasedItems());
  const stocks = useSelector(selectStocks);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClose = () => dispatch(closeStockModal('AddGroupModal'));

  const onAddGroup = () => {
    if (!name.trim().length) {
      alert('Group name is required');
      return;
    }
    const selectedStocks = changeCheckInfoToGroupFormat(checkedItems);
    dispatch(addGroup({ groupName: name, selectedStocks }));
    dispatch(initCheckedItems(stocks));
    onClose();
  };

  return (
    <Modal title='Add Group' onClose={onClose}>
      <StyledAddGroupModal>
        <div className='group-name'>
          <label className='group-name__label' htmlFor='group-name'>
            Group Name* :
          </label>
          <Input
            value={name}
            onChange={onChangeName}
            width={150}
            id='group-name'
          />
        </div>
        <GroupModalTable />
        <div className='button-groups'>
          <ContainedButton onClick={onAddGroup} width={150} size='m'>
            Add
          </ContainedButton>
        </div>
      </StyledAddGroupModal>
    </Modal>
  );
};

export default AddGroupModal;

const StyledAddGroupModal = styled('div')`
  width: 900px;
  max-height: 500px;
  overflow-y: auto;

  .group-name {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .group-name__label {
      width: 120px;
    }

    input {
      background-color: ${({ theme }) => theme.colors.grey100};
    }
  }

  .button-groups {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
  }
`;
