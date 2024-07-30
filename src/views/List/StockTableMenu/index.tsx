import styled from 'styled-components';
import StockSearch from './StockSearch';

function StockTableMenu() {
  return (
    <StyledStockTableMenu>
      <StockSearch />
    </StyledStockTableMenu>
  );
}

export default StockTableMenu;

const StyledStockTableMenu = styled('div')`
  display: flex;
  padding-bottom: 1rem;
  justify-content: flex-end;
`;
