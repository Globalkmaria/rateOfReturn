import styled from 'styled-components';
import Search from '../../../../components/Search';
import AddSampleData from './AddSampleData';
import EditCurrentPrice from './EditCurrentPrice';

type Props = {
  searchQuery: string;
  onSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function StockTableMenu({ searchQuery, onSearchQueryChange }: Props) {
  return (
    <StyledStockTableMenu>
      <StyledContent>
        <AddSampleData />
        <EditCurrentPrice />
        <Search value={searchQuery} height='m' onChange={onSearchQueryChange} />
      </StyledContent>
    </StyledStockTableMenu>
  );
}

export default StockTableMenu;

const StyledStockTableMenu = styled('div')`
  display: flex;
  padding-bottom: 10px;
  justify-content: flex-end;
`;

const StyledContent = styled('div')`
  display: flex;
  gap: 5px;
`;
