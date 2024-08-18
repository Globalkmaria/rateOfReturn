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
      <AddSampleData />
      <EditCurrentPrice />
      <Search
        placeholder={SEARCH_PLACEHOLDER_TEXT}
        value={searchQuery}
        height='m'
        onChange={onSearchQueryChange}
      />
    </StyledStockTableMenu>
  );
}

export default StockTableMenu;

const SEARCH_PLACEHOLDER_TEXT = 'Search by stock name...';

const StyledStockTableMenu = styled('div')`
  display: flex;
  justify-content: flex-end;
  column-gap: 10px;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 100%;

    .search {
      width: 100%;
    }
  }
`;
