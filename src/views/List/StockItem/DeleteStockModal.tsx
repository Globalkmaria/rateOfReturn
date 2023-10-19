import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { ContainedButton } from '../../../components/Button';
import {
  deletePurchasedItem,
  deleteStock,
} from '../../../features/stockList/stockListSlice';
import {
  deletePurchaseItemFromGroups,
  deleteStockFromGroups,
} from '../../../features/groups/groupsSlice';
import {
  deleteCheckedItems,
  deleteStockCheck,
} from '../../../features/checkedItems/checkedItemsSlice';
import userStocksService from '../../../service/userStocks/userStocks';
import { selectStockInfoById } from '../../../features/stockList/selectors';
import { selectIsLoggedIn } from '../../../features/user/selectors';
import PortalModal from '../../../components/Modal/PortalModal';

export type DeleteModalProps = {
  onClose: () => void;
  type: 'stock' | 'purchase';
  stockId: string;
  purchasedId: string;
};

export const DeleteStockModal = ({
  onClose,
  type,
  stockId,
  purchasedId,
}: DeleteModalProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const stocks = useSelector(selectStockInfoById(stockId));

  const onDeletePurchasedStock = async () => {
    if (isLoggedIn) {
      let result;
      if (stocks.purchasedItems.allIds.length === 1) {
        result = await userStocksService.deleteUserStock(stockId);
      } else {
        result = await userStocksService.deleteUserItem({
          stockId,
          itemId: purchasedId,
        });
      }

      if (!result.success) return;
    }

    dispatch(deletePurchasedItem({ stockId, purchasedId }));
    dispatch(deletePurchaseItemFromGroups({ stockId, purchasedId }));
    dispatch(deleteCheckedItems({ stockId, purchasedId }));
    onClose();
  };

  const onDeleteStock = async () => {
    if (isLoggedIn) {
      const result = await userStocksService.deleteUserStock(stockId);
      if (!result.success) return;
    }
    dispatch(deleteStock(stockId));
    dispatch(deleteStockFromGroups(stockId));
    dispatch(deleteStockCheck(stockId));
    onClose();
  };

  const onDelete = type === 'stock' ? onDeleteStock : onDeletePurchasedStock;
  return (
    <PortalModal onClose={onClose}>
      <StyledDeleteModal>
        <p className='message'>{MESSAGES[type]}</p>
        <ContainedButton size='l' color='warning' onClick={onDelete}>
          Delete
        </ContainedButton>
      </StyledDeleteModal>
    </PortalModal>
  );
};

export const MESSAGES: { [key in DeleteModalProps['type']]: string } = {
  stock: 'Are you sure you want to delete this stock?',
  purchase: 'Are you sure you want to delete this item?',
};

export const StyledDeleteModal = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin-bottom: 20px;

  .message {
    padding: 20px 0 40px;
    font-size: 1.4em;
    font-weight: 700;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    width: 60vw;

    .message {
      padding: 20px 0;
      font-size: 1rem;
      text-align: center;
    }
  }
`;
