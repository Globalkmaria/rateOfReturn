import styled from 'styled-components';

import StockCard from './StockCard';

function StockCards() {
  return (
    <StockCardsStyled>
      <StockCard />
      <StockCard />
      <StockCard />
    </StockCardsStyled>
  );
}

export default StockCards;

const StockCardsStyled = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
