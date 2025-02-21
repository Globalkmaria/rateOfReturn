import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import userGroupsService from '@/service/userGroups/userGroups';

import { removePurchasedItemFromGroup } from '@/features/groups/groupsSlice';
import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { selectIsLoggedIn } from '@/features/user/selectors';

import IconButton from '@/components/IconButton';
import { TableCell } from '@/components/Table';

interface Props {
  stockId: string;
  purchasedId: string;
  isLock: boolean;
}

function PurchasedOtherGroupAction({ stockId, purchasedId }: Props) {
  const dispatch = useDispatch();
  const { groupId = MAIN_GROUP_ID } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onRemoveItemFromGroup = async () => {
    if (isLoggedIn) {
      const result = await userGroupsService.deletePurchasedItemFromUserGroup({
        stockId,
        purchasedId,
        groupId,
      });

      if (!result.success) return;
    }
    dispatch(
      removePurchasedItemFromGroup({
        groupId,
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
