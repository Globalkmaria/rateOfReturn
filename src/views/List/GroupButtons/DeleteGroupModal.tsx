import { useSelector } from 'react-redux';

import styled from 'styled-components';

import IconButton from '@/components/IconButton';

import DeleteGroupWarning from './DeleteGroupWarning';
import PortalModal from '../../../components/Modal/PortalModal';
import { selectGroups } from '../../../features/groups/selectors';
import { Group } from '../../../features/groups/type';
import useModal from '../hooks/useModal';

const NO_GROUP_MESSAGE = 'There is no group.';

type Props = {
  onClose: () => void;
};

const DeleteGroupModal = ({ onClose }: Props) => {
  const groups = useSelector(selectGroups);
  const noGroups = groups.groups.allIds.length === 0;
  return (
    <PortalModal title='Delete Group' onClose={onClose}>
      <StyledDeleteGroupModal>
        {groups.groups.allIds.map(id => (
          <GroupItem groupInfo={groups.groups.byId[id]} key={id} />
        ))}
        {noGroups && <span>{NO_GROUP_MESSAGE}</span>}
      </StyledDeleteGroupModal>
    </PortalModal>
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
      <DeleteButton icon='delete' onClick={onOpenModal} />
      {showModal && (
        <DeleteGroupWarning groupId={groupId} onClose={onCloseModal} />
      )}
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
  padding: 10px;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey100};
    border-radius: 5px;
  }
`;

const StyledGroupName = styled('h1')`
  font-weight: 600;
`;

const DeleteButton = styled(IconButton)`
  &&:hover {
    background: ${({ theme }) => theme.colors.grey300};
  }
`;
