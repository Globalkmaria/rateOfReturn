import React from 'react';
import styled from 'styled-components';
import StockList from '../views/List/StockList';

interface ListProps {}

const List: React.FC<ListProps> = () => {
  return (
    <StyledList>
      <StockList />
    </StyledList>
  );
};

export default List;

const StyledList = styled('div')``;
