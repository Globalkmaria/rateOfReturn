import React, { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import GroupModalTable from './GroupModal/GroupModalTable';
import { useAddGroup } from './hooks/useAddGroup';
import { ContainedButton } from '../../../components/Button';
import { Input } from '../../../components/Input/Input';
import PortalModal from '../../../components/Modal/PortalModal';

type Props = {
  onClose: () => void;
};

const AddGroupModal = ({ onClose }: Props) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const handleAddGroup = useAddGroup();

  const onAddGroup = async () => {
    const result = await handleAddGroup(name);
    if (result) onClose();
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current?.focus();
  }, []);

  return (
    <PortalModal title='Add new group' onClose={onClose}>
      <StyledAddGroupModal>
        <StyledGroupName>
          <StyledGroupLabel htmlFor='group-name'>
            Group Name* :
          </StyledGroupLabel>
          <Input
            ref={nameInputRef}
            value={name}
            onChange={onChangeName}
            width={150}
            id='group-name'
          />
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
  @media ${({ theme }) => theme.devices.tablet} {
    width: 70vw;
  }
`;

const StyledGroupName = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  input {
    background: ${({ theme }) => theme.colors.grey200};

    &:focus {
      background: ${({ theme }) => theme.colors.grey200};
    }
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
