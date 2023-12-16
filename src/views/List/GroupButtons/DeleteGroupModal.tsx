import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';

import { Group } from '../../../features/groups/type';
import { selectGroups } from '../../../features/groups/selectors';
import Modal from '../../../components/Modal/Modal';
import { BorderButton } from '../../../components/Button';
import useModal from '../hooks/useModal';
import DeleteGroupWarning from './DeleteGroupWarning';

const NO_GROUP_MESSAGE = 'There is no group.';

type Props = {
  onClose: () => void;
};

const DeleteGroupModal = ({ onClose }: Props) => {
  const groups = useSelector(selectGroups);
  const noGroups = groups.groups.allIds.length === 0;
  return (
    <Modal title='Delete Group' onClose={onClose}>
      <StyledDeleteGroupModal>
        {groups.groups.allIds.map(id => (
          <GroupItem groupInfo={groups.groups.byId[id]} key={id} />
        ))}
        {noGroups && <span>{NO_GROUP_MESSAGE}</span>}
      </StyledDeleteGroupModal>
    </Modal>
  );
};

export default DeleteGroupModal;

const GroupItem = ({ groupInfo }: { groupInfo: Group }) => {
  const { showModal, onOpenModal, onCloseModal } = useModal();
  const { groupId, groupName } = groupInfo;
  if (groupId === '1') return <></>;

  return (
    <StyledGroupItem>
      <StyledGroupName>{groupName}</StyledGroupName>
      <BorderButton onClick={onOpenModal} showLine={false}>
        <FaTrash />
      </BorderButton>
      {showModal && <DeleteGroupWarning groupId={groupId} onClose={onCloseModal} />}
    </StyledGroupItem>
  );
};

const StyledDeleteGroupModal = styled('div')`
  width: 300px;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 70vw;
  }
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

const StyledGroupName = styled('h1')`
  font-weight: 600;
`;
