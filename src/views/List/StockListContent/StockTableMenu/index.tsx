import { memo } from 'react';

import styled from 'styled-components';

import AddSampleData from './AddSampleData';
import EditCurrentPrice from './EditCurrentPrice';
import Search from '../../../../components/Search';

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

export default memo(StockTableMenu);

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
