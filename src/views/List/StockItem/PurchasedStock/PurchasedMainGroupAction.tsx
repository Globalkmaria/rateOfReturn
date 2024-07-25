import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { TableCell } from '@/components/Table';
import useModal from '../../hooks/useModal';
import { EditButton, MoreButton } from '@/components/IconButton';
import { DropboxItem } from '@/components/Dropbox/DropboxItem';
import AddToGroupModal from './AddToGroupModal';
import { DeleteStockModal } from '../DeleteStockModal';
import { selectIsMainGroupSelected } from '@/features/groups/selectors';
import userSoldsService from '@/service/userSolds/service';
import getDateAndTime from '@/utils/getDateAndTime';
import { NewSold } from '@/repository/userSolds';
import { selectIsLoggedIn } from '@/features/user/selectors';
import { selectPurchasedItemsById } from '@/features/stockList/selectors';
import {
  addNewSold,
  generateSoldInfoFromPurchasedInfo,
} from '@/features/solds';
import { generateSoldItem } from '../SummaryInfo/utils';

interface Props {
  stockId: string;
  purchasedId: string;
  isLock: boolean;
  onToggleLock: () => void;
}
function PurchasedMainGroupAction({
  stockId,
  purchasedId,
  isLock,
  onToggleLock,
}: Props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );

  const deleteModal = useModal();
  const groupModal = useModal();

  const onItemSold = async () => {
    if (isLoggedIn) {
      const { date, time } = getDateAndTime();
      const soldItem: NewSold = generateSoldItem(mainInfo, purchasedItem);
      const result = await userSoldsService.addNewSolds({
        date,
        time,
        solds: [soldItem],
      });

      if (!result.success) {
        alert(result.message);
        return;
      }
    }
    const soldInfo = generateSoldInfoFromPurchasedInfo(mainInfo, purchasedItem);
    dispatch(addNewSold({ soldInfo, stockId: mainInfo.stockId }));
  };

  return (
    <>
      <TableCell>
        <StyledButtonGroup>
          <EditButton
            isLock={isLock}
            onClick={onToggleLock}
            disabled={!isMainGroupSelected}
          />
          <MoreButton width={80} vertical='bottom' horizontal='right'>
            <DropboxItem
              onClick={onItemSold}
              disabled={!isLock}
              title='To sold list'
            >
              Sold
            </DropboxItem>
            <DropboxItem onClick={groupModal.onOpenModal} title='Group actions'>
              Group
            </DropboxItem>
            <DropboxItem
              onClick={deleteModal.onOpenModal}
              title='Delete this item'
            >
              Delete
            </DropboxItem>
          </MoreButton>
        </StyledButtonGroup>
      </TableCell>
      {groupModal.showModal && (
        <AddToGroupModal
          stockId={stockId}
          purchasedId={purchasedId}
          onClose={groupModal.onCloseModal}
        />
      )}
      {deleteModal.showModal && (
        <DeleteStockModal
          type='purchase'
          stockId={stockId}
          purchasedId={purchasedId}
          onClose={deleteModal.onCloseModal}
        />
      )}
    </>
  );
}

export default PurchasedMainGroupAction;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
