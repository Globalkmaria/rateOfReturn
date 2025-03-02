import { useMemo } from 'react';

import styled from 'styled-components';

import useSort from '@/components/table/sort/useSort';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/table/Table';
import { Ellipsis } from '@/components/Text';

import PortfolioAllocationTableHeader from './PortfolioAllocationTableHeader';
import {
  PORTFOLIO_ALLOCATION_SORT_OPTIONS,
  PORTFOLIO_ALLOCATION_SORT_OPTIONS_FUNCTIONS,
} from './PortfolioAllocationTableHeader/const';
import { StockAllocationInfo } from './utils';

interface Props {
  stockAllocationInfo: StockAllocationInfo;
}

function PortfolioAllocationTable({ stockAllocationInfo }: Props) {
  const sortProps = useMemo(
    () => ({
      ids: stockAllocationInfo.stockIds,
      items: stockAllocationInfo,
      sortOptions: PORTFOLIO_ALLOCATION_SORT_OPTIONS,
      sortFunctionProps: {
        ids: stockAllocationInfo.stockIds,
        items: stockAllocationInfo,
      },
      sortFunctions: PORTFOLIO_ALLOCATION_SORT_OPTIONS_FUNCTIONS,
    }),
    [stockAllocationInfo],
  );

  const { sortBy, isValidSortBy, sortedList, onSortChange } =
    useSort(sortProps);

  if (!isValidSortBy) return null;

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledTable>
          <PortfolioAllocationTableHeader
            currentOption={sortBy}
            onSortChange={onSortChange}
          />
          <TableBody>
            {sortedList.map(stockId => (
              <Item
                key={stockId}
                stockId={stockId}
                stockAllocationInfo={stockAllocationInfo}
              />
            ))}
          </TableBody>
        </StyledTable>
      </StyledContainer>
    </StyledWrapper>
  );
}

export default PortfolioAllocationTable;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledContainer = styled.div`
  overflow: auto;
`;

const StyledTable = styled(Table)`
  margin-top: 20px;
  max-width: 1200px;
  background-color: ${({ theme }) => theme.colors.white};
  text-wrap: nowrap;

  td {
    padding: 0.4rem;
  }

  th:first-child {
    @media ${({ theme }) => theme.devices.mobile} {
      width: 100px;
      min-width: 100px;
    }
  }

  thead {
    tr:first-child th:nth-child(n + 2) {
      border-bottom: none;
    }

    tr:nth-child(2) th:first-child {
      border-left: none;
    }
  }

  tbody tr > :first-child {
    background: ${({ theme }) => theme.colors.grey100};
  }

  tbody tr {
    &:hover {
      background: ${({ theme }) => theme.colors.grey100};
    }
  }

  thead tr:first-child > th:first-child,
  tbody tr > :first-child {
    position: sticky;
    z-index: 2;
    left: 0;
  }
`;

interface ItemProps {
  stockId: string;
  stockAllocationInfo: StockAllocationInfo;
}

function Item({ stockId, stockAllocationInfo }: ItemProps) {
  return (
    <TableRow>
      <TableCell>
        <StyledEllipsis width={180}>
          {stockAllocationInfo.stockIdAndNamePairs[stockId]}
        </StyledEllipsis>
      </TableCell>
      <TableCell align='right'>
        {stockAllocationInfo.buyPrice[stockId].percent} %
      </TableCell>
      <TableCell align='right'>
        {stockAllocationInfo.buyPrice[stockId].totalPrice}
      </TableCell>
      <TableCell align='right'>
        {stockAllocationInfo.currentPrice[stockId].percent} %
      </TableCell>
      <TableCell align='right'>
        {stockAllocationInfo.currentPrice[stockId].totalPrice}
      </TableCell>
    </TableRow>
  );
}

const StyledEllipsis = styled(Ellipsis)`
  @media ${({ theme }) => theme.devices.mobile} {
    width: 100px;
  }
`;
