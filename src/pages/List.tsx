import styled from 'styled-components';

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

const StyledList = styled('div')`
  padding: 20px;
  background: ${({ theme }) => theme.colors.greyBackground};
`;
