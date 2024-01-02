import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { ContainedButton } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';
import PortalModal from '../../../components/Modal/PortalModal';

import GroupModalTable from './GroupModal/GroupModalTable';
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
    <PortalModal title='Add Group' onClose={onClose}>
      <StyledAddGroupModal>
        <StyledGroupName>
          <StyledGroupLabel htmlFor='group-name'>Group Name* :</StyledGroupLabel>
          <Input value={name} onChange={onChangeName} width={150} id='group-name' />
        </StyledGroupName>
        <GroupModalTable />
        <StyledButtonGroups>
          <ContainedButton onClick={onAddGroup} width={150} size='m'>
            Add
          </ContainedButton>
        </StyledButtonGroups>
      </StyledAddGroupModal>
    </PortalModal>
  );
};

export default AddGroupModal;

const StyledAddGroupModal = styled('div')`
  max-width: 1000px;
  width: 70vw;
  max-height: 500px;
  overflow: auto;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 70vw;
  }
`;

const StyledGroupName = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    background-color: ${({ theme }) => theme.colors.grey100};
  }
`;

const StyledGroupLabel = styled('label')`
  min-width: 120px;
`;

const StyledButtonGroups = styled('div')`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;
