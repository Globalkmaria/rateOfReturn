import styled from 'styled-components';
import StockList from '../views/List/StockList';
import ModalSpace from '../views/List/ModalSpace';

const List = () => {
  return (
    <StyledList>
      <StockList />
      <ModalSpace />
    </StyledList>
  );
};

export default List;

const StyledList = styled('div')`
  padding: 20px;
  background: ${({ theme }) => theme.colors.greyBackground};
`;
