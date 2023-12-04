import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { ContainedButton } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';
import GroupModalTable from './GroupModal/GroupModalTable';
import Modal from '../../../components/Modal/Modal';
import { useAddGroup } from './hooks/useAddGroup';

type Props = {
  onClose: () => void;
};

const AddGroupModal = ({ onClose }: Props) => {
  const [name, setName] = useState('');
  const handleAddGroup = useAddGroup();
  const onAddGroup = () => {
    handleAddGroup(name);
    onClose();
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
  max-width: 1000px;
  width: 70vw;
  max-height: 500px;
  overflow: auto;

  .group-name {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .group-name__label {
      min-width: 120px;
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

  @media ${({ theme }) => theme.devices.tablet} {
    width: 70vw;
  }
`;
