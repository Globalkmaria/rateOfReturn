import React, { useState } from 'react';
import styled from 'styled-components';
import { BorderButton } from '../../../components/Button';
import Modal from '../../../components/Modal';
import Select from '../../../components/Select';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectGroups,
  updateSelectedGroupId,
} from '../../../features/groups/groupsSlice';
import { getOptions } from './utils';
import AddGroupModal from './AddGroupModal';

const GroupButtons = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const groups = useSelector(selectGroups);
  const options = getOptions(groups);

  const onClose = () => setIsOpen(false);

  const onGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSelectedGroupId(e.target.value));
  };

  const onOpenAddModal = () => {
    setIsOpen(true);
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
        />
        <BorderButton onClick={onOpenAddModal} size='m'>
          그룹 생성
        </BorderButton>
        <BorderButton size='m'>그룹 수정</BorderButton>
        <BorderButton size='m'>그룹 삭제</BorderButton>
      </StyledGroupButtons>
      <Modal isOpen={isOpen} onClose={onClose}>
        <StyledGroupModal>
          <AddGroupModal onClose={onClose} />
        </StyledGroupModal>
      </Modal>
    </>
  );
};

export default GroupButtons;

const StyledGroupButtons = styled('div')`
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
`;

export const StyledGroupModal = styled('div')`
  display: flex;
  flex-direction: column;
  width: 900px;
`;
