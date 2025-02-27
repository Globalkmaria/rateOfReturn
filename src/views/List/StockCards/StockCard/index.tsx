import styled from 'styled-components';

import StockCardHeader from './StockCardHeader';
import StockCardItem from './StockCardItem';

function StockCard() {
  return (
    <StyledStockCard>
      <StockCardHeader />
      <StockCardItem />
      <StockCardItem />
    </StyledStockCard>
  );
}

export default StockCard;

const StyledStockCard = styled('div')`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 8px;
  font-size: 1rem;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StockCardRowStyled = styled('div')`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
`;

export const StockCardColumnStyled = styled('div')<{ grow: number }>`
  display: flex;
  flex: ${props => props.grow} 0 auto;
  gap: 10px;
`;

export const StockCardLabelStyled = styled('div')`
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.grey200};
  border-radius: 4px;
`;
export const StockCardValueStyled = styled('div')`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;
