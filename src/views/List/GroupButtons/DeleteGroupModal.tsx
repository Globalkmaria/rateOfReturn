import React from 'react';
import styled from 'styled-components';
import {
  Group,
  deleteGroup,
  selectGroups,
} from '../../../features/groups/groupsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/Modal';
import { BorderButton } from '../../../components/Button';
import { FaTrash } from 'react-icons/fa';

interface DeleteGroupModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const NO_GROUP_MESSAGE = '그룹이 없습니다.';

const DeleteGroupModal = ({ onClose, isOpen }: DeleteGroupModalProps) => {
  const groups = useSelector(selectGroups);
  const noGroups = groups.groups.allIds.length === 1;
  return (
    <Modal title='그룹 삭제' isOpen={isOpen} onClose={onClose}>
      <StyledDeleteGroupModal>
        {groups.groups.allIds.map((id) => (
          <GroupItem groupInfo={groups.groups.byId[id]} />
        ))}
        {noGroups && <span>{NO_GROUP_MESSAGE}</span>}
      </StyledDeleteGroupModal>
    </Modal>
  );
};

export default DeleteGroupModal;

const GroupItem = ({ groupInfo }: { groupInfo: Group }) => {
  const dispatch = useDispatch();
  const { groupId, groupName } = groupInfo;
  if (groupId === '1') return <></>;

  const onDelete = () => {
    dispatch(deleteGroup(groupId));
  };

  return (
    <StyledGroupItem>
      <h1 className='group-name'>{groupName}</h1>
      <BorderButton onClick={onDelete} showLine={false}>
        <FaTrash />
      </BorderButton>
    </StyledGroupItem>
  );
};

const StyledDeleteGroupModal = styled('div')`
  width: 300px;
`;

const StyledGroupItem = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey300};
    border-radius: 5px;
  }
`;
