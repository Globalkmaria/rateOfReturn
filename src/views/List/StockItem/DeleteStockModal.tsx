import { useDispatch, useSelector } from 'react-redux';
import { ContainedButton } from '../../../components/Button';
import Modal from '../../../components/Modal';
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
import {
  closeStockModal,
  selectModalProps,
} from '../../../features/stockModal/stockModalSlice';
import styled from 'styled-components';
import userStocksService from '../../../service/userStocks/userStocks';
import { selectStockInfoById } from '../../../features/stockList/selectors';

export type DeleteModalProps = {
  type: 'stock' | 'purchase';
  stockId: string;
  purchasedId: string;
};

export const DeleteStockModal = () => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeStockModal('DeleteStockModal'));
  const { stockId, purchasedId, type } = useSelector(
    selectModalProps('DeleteStockModal'),
  ) as DeleteModalProps;
  const stocks = useSelector(selectStockInfoById(stockId));

  const onDeletePurchasedStock = async () => {
    let result;

    if (stocks.purchasedItems.allIds.length === 1) {
      result = await userStocksService.deleteUserStock(stockId);
    } else {
      result = await userStocksService.deleteUserItem({
        stockId,
        itemId: purchasedId,
      });
    }

    if (result.success) {
      dispatch(deletePurchasedItem({ stockId, purchasedId }));
      dispatch(deletePurchaseItemFromGroups({ stockId, purchasedId }));
      dispatch(deleteCheckedItems({ stockId, purchasedId }));
      onClose();
    }
  };

  const onDeleteStock = async () => {
    const result = await userStocksService.deleteUserStock(stockId);
    if (result.success) {
      dispatch(deleteStock(stockId));
      dispatch(deleteStockFromGroups(stockId));
      dispatch(deleteStockCheck(stockId));
      onClose();
    }
  };

  const onDelete = type === 'stock' ? onDeleteStock : onDeletePurchasedStock;
  return (
    <Modal onClose={onClose}>
      <StyledDeleteModal>
        <p className='message'>{MESSAGES[type]}</p>
        <ContainedButton size='l' color='warning' onClick={onDelete}>
          Delete
        </ContainedButton>
      </StyledDeleteModal>
    </Modal>
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
`;
