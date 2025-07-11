import styled from 'styled-components';

import { StyledPage } from './style';
import StockList from '../views/List/StockList';

const List = () => {
  return (
    <>
      <title>
        Investment Portfolio Tracker | Manage Your Stocks and Bonds Efficiently
        | ROR
      </title>
      <StyledList>
        <StockList />
      </StyledList>
    </>
  );
};

export default List;

const StyledList = styled(StyledPage)`
  padding: 0 40px 20px 40px;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0 20px 20px 20px;
  }
`;
