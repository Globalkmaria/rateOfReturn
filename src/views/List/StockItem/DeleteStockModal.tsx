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
  selectStockModal,
} from '../../../features/stockModal/stockModalSlice';
import styled from 'styled-components';

type DeleteModalType = {
  type: 'stock' | 'purchase';
};

export const DeleteStockModal = () => {
  const { stockId, purchasedId, type } = useSelector(selectStockModal);
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeStockModal());

  const onDeletePurchasedStock = () => {
    dispatch(deletePurchasedItem({ stockId, purchasedId }));
    dispatch(deletePurchaseItemFromGroup({ stockId, purchasedId }));
    dispatch(deleteCheckedItems({ stockId, purchasedId }));
    dispatch(closeStockModal());
  };

  const onDeleteStock = () => {
    dispatch(deleteStock(stockId));
    dispatch(deleteStockFromGroup(stockId));
    dispatch(deleteStockCheck(stockId));
    dispatch(closeStockModal());
  };

  const onDelete = type === 'stock' ? onDeleteStock : onDeletePurchasedStock;
  return (
    <Modal onClose={onClose} isOpen={true}>
      <StyledDeleteModal>
        <p className='message'>{MESSAGES[type]}</p>
        <ContainedButton size='l' color='warning' onClick={onDelete}>
          Delete
        </ContainedButton>
      </StyledDeleteModal>
    </Modal>
  );
};

export const MESSAGES: { [key in DeleteModalType['type']]: string } = {
  stock: 'Are you sure you want to delete this stock?',
  purchase: 'Are you sure you want to delete this item?',
};

export const StyledDeleteModal = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;

  .message {
    padding: 20px 0 40px;
    font-size: 1.4em;
    font-weight: 700;
  }
`;
