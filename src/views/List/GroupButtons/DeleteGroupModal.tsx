import React from 'react';
import styled from 'styled-components';
import { Group } from '../../../features/groups/type';
import { selectGroups } from '../../../features/groups/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../components/Modal';
import { BorderButton } from '../../../components/Button';
import { FaTrash } from 'react-icons/fa';
import {
  closeStockModal,
  openStockModal,
} from '../../../features/stockModal/stockModalSlice';
import { DeleteGroupWarningProps } from './DeleteGroupWarning';

const NO_GROUP_MESSAGE = 'There is no group.';

const DeleteGroupModal = () => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeStockModal('DeleteGroupModal'));
  const groups = useSelector(selectGroups);
  const noGroups = groups.groups.allIds.length === 1;
  return (
    <Modal title='Delete Group' onClose={onClose}>
      <StyledDeleteGroupModal>
        {groups.groups.allIds.map((id) => (
          <GroupItem groupInfo={groups.groups.byId[id]} key={id} />
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

  const onOpenDeleteModal = () => {
    const props: DeleteGroupWarningProps = {
      groupId,
    };
    dispatch(
      openStockModal({
        modalName: 'DeleteGroupWarning',
        props,
      }),
    );
  };

  return (
    <StyledGroupItem>
      <h1 className='group-name'>{groupName}</h1>
      <BorderButton onClick={onOpenDeleteModal} showLine={false}>
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
