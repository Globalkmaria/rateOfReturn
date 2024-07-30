import styled from 'styled-components';
import Search from '../../../../components/Search';

type Props = {
  searchQuery: string;
  onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function StockTableMenu({ searchQuery, onSearchQueryChange }: Props) {
  return (
    <StyledStockTableMenu>
      <Search value={searchQuery} onChange={onSearchQueryChange} />
    </StyledStockTableMenu>
  );
}

export default StockTableMenu;

const StyledStockTableMenu = styled('div')`
  display: flex;
  padding-bottom: 1rem;
  justify-content: flex-end;
`;
