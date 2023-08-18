import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { ContainedButton } from '../../../components/Button';
import { Input } from '../../../components/Input';
import GroupModalTable from './GroupModal/GroupModalTable';
import Modal from '../../../components/Modal';
import { closeStockModal } from '../../../features/stockModal/stockModalSlice';
import { useAddGroup } from './hooks/useAddGroup';

const AddGroupModal = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const handleAddGroup = useAddGroup();
  const onAddGroup = () => handleAddGroup(name);

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClose = () => dispatch(closeStockModal('AddGroupModal'));

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
