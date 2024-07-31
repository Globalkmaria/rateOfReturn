import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { memo } from 'react';

import { selectIsMainGroupSelected } from '@/features/groups/selectors';
import { selectStockIds } from '@/features/selectors';
import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';
import useModal from '@/views/List/hooks/useModal';
import EditCurrentPriceModal from './EditCurrentPriceModal';

function EditCurrentPrice() {
  const isMainGroup = useSelector(selectIsMainGroupSelected);
  const { showModal, onCloseModal, onToggleModal } = useModal();
  const noUserStockData = useSelector(selectStockIds).length === 0;

  if (!isMainGroup) return null;

  return (
    <>
      <BorderButton size='m' onClick={onToggleModal} disabled={noUserStockData}>
        <Icon icon='priceChange' disabled={noUserStockData} />
        <StyledText>Edit current prices</StyledText>
      </BorderButton>
      {showModal && <EditCurrentPriceModal onClose={onCloseModal} />}
    </>
  );
}

export default memo(EditCurrentPrice);

const StyledText = styled.span`
  margin-left: 5px;
  color: inherit;

  @media ${({ theme }) => theme.devices.laptop} {
    display: none;
  }
`;
