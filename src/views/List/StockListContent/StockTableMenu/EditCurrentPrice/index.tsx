import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { checkIfMainGroup } from '@/utils/group';

import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { selectStockIds } from '@/features/selectors';

import useModal from '@/views/List/hooks/useModal';

import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';

import EditCurrentPriceModal from './EditCurrentPriceModal';

function EditCurrentPrice() {
  const { groupId = MAIN_GROUP_ID } = useParams();
  const isMainGroup = checkIfMainGroup(groupId);

  const { showModal, onCloseModal, onToggleModal } = useModal();
  const noUserStockData = useSelector(selectStockIds(groupId)).length === 0;

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
