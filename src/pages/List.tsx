import styled from 'styled-components';
import StockList from '../views/List/StockList';

interface ListProps {}

const List = (props: ListProps) => {
  return (
    <StyledList>
      <StockList />
    </StyledList>
  );
};

export default List;

const StyledList = styled('div')``;
