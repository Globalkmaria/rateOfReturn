import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import IconButton from '@/components/IconButton';
import PortalModal from '@/components/Modal/PortalModal';
import {
  addPurchasedItemToGroup,
  removePurchasedItemFromGroup,
} from '@/features/groups/groupsSlice';
import { selectGroups } from '@/features/groups/selectors';
import { Group } from '@/features/groups/type';
import { checkPurchasedItemInGroup } from './utils';

interface AddToGroupModalProps {
  onClose: () => void;
  stockId: string;
  purchasedId: string;
}

interface ItemProps {
  groupInfo: Group;
  isAdded: boolean;
  onRemove: () => void;
  onAdd: () => void;
}

function AddToGroupModal({
  onClose,
  stockId,
  purchasedId,
}: AddToGroupModalProps) {
  const dispatch = useDispatch();
  const { groups } = useSelector(selectGroups);

  const handleAdd = (groupId: string) => {
    dispatch(
      addPurchasedItemToGroup({
        groupId,
        stockId,
        purchasedId,
      }),
    );
  };
  const handleRemove = (groupId: string) => {
    dispatch(
      removePurchasedItemFromGroup({
        groupId: groupId,
        stockId,
        purchasedId,
      }),
    );
  };

  return (
    <PortalModal onClose={onClose} title='Add this stock to a group'>
      <StyledModalContainer>
        {groups.allIds.map(id => (
          <Item
            key={id}
            groupInfo={groups.byId[id]}
            isAdded={checkPurchasedItemInGroup(
              groups.byId[id],
              stockId,
              purchasedId,
            )}
            onAdd={() => handleAdd(id)}
            onRemove={() => handleRemove(id)}
          />
        ))}
      </StyledModalContainer>
    </PortalModal>
  );
}

export default AddToGroupModal;

function Item({ groupInfo, isAdded, onRemove, onAdd }: ItemProps) {
  return (
    <StyledItem>
      <div>{groupInfo.groupName}</div>
      {isAdded ? (
        <IconButton width={32} icon='remove' onClick={onRemove} />
      ) : (
        <IconButton width={32} icon='add' onClick={onAdd} />
      )}
    </StyledItem>
  );
}

const StyledModalContainer = styled('div')`
  margin-top: 10px;
  width: 320px;
  display: flex;
  flex-direction: column;
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;

  &:hover {
    background: ${({ theme }) => theme.colors.grey200};
    border-radius: 5px;
  }
`;
