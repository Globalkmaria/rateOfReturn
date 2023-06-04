import { useDispatch, useSelector } from 'react-redux';
import { ContainedButton } from '../../../components/Button';
import Modal from '../../../components/Modal';
import {
  deletePurchasedItem,
  deleteStock,
} from '../../../features/stockList/stockListSlice';
import {
  deletePurchaseItemFromGroup,
  deleteStockFromGroup,
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

  const onDeletePurchasedStock = () => {
    dispatch(deletePurchasedItem({ stockId, purchasedId }));
    dispatch(deletePurchaseItemFromGroup({ stockId, purchasedId }));
    dispatch(deleteCheckedItems({ stockId, purchasedId }));
    onClose();
  };

  const onDeleteStock = () => {
    dispatch(deleteStock(stockId));
    dispatch(deleteStockFromGroup(stockId));
    dispatch(deleteStockCheck(stockId));
    onClose();
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
