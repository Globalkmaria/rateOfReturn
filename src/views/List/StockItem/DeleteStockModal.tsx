import styled from 'styled-components';

import { ContainedButton } from '../../../components/Button';
import PortalModal from '../../../components/Modal/PortalModal';
import useDeleteStock from './hooks/useDeleteStock';
import useDeletePurchased from './hooks/useDeletePurchased';

export type DeleteModalProps = {
  onClose: () => void;
  type: 'stock' | 'purchase';
  stockId: string;
  purchasedId: string;
};

export const DeleteStockModal = ({ onClose, type, stockId, purchasedId }: DeleteModalProps) => {
  const onDeleteStock = useDeleteStock({ onClose, stockId });
  const onDeletePurchased = useDeletePurchased({
    onClose,
    stockId,
    purchasedId,
  });

  const onDelete = type === 'stock' ? onDeleteStock : onDeletePurchased;
  return (
    <PortalModal onClose={onClose}>
      <StyledDeleteModal>
        <StyledMessage>{MESSAGES[type]}</StyledMessage>
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

  @media ${({ theme }) => theme.devices.tablet} {
    width: 60vw;
  }
`;

const StyledMessage = styled('div')`
  padding: 20px 0 40px;
  font-size: 1.4em;
  font-weight: 700;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 20px 0;
    font-size: 1rem;
    text-align: center;
  }
`;
