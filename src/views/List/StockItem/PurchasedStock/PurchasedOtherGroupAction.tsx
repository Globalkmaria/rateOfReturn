import IconButton from '@/components/IconButton';
import { TableCell } from '@/components/Table';
import { removePurchasedItemFromGroup } from '@/features/groups/groupsSlice';
import { selectSelectedGroupId } from '@/features/groups/selectors';
import { selectIsLoggedIn } from '@/features/user/selectors';
import userGroupsService from '@/service/userGroups/userGroups';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

interface Props {
  stockId: string;
  purchasedId: string;
  isLock: boolean;
}

function PurchasedOtherGroupAction({ stockId, purchasedId, isLock }: Props) {
  const dispatch = useDispatch();

  const selectedGroupId = useSelector(selectSelectedGroupId);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onRemoveItemFromGroup = async () => {
    if (isLoggedIn) {
      const result = await userGroupsService.deletePurchasedItemFromUserGroup({
        stockId,
        purchasedId,
        groupId: selectedGroupId,
      });

      if (!result.success) return;
    }
    dispatch(
      removePurchasedItemFromGroup({
        groupId: selectedGroupId,
        stockId,
        purchasedId,
      }),
    );
  };

  return (
    <>
      <TableCell>
        <StyledContainer>
          <IconButton
            width={32}
            icon='remove'
            onClick={onRemoveItemFromGroup}
            title='Remove from group'
          />
        </StyledContainer>
      </TableCell>
    </>
  );
}

export default PurchasedOtherGroupAction;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
