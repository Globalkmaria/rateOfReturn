import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectIsMainGroupSelected } from '../../features/groups/selectors';
import { Table, TableBody } from '../../components/Table';
import StockItem from './StockItem/StockItem';
import StockListHeader from './Header/StockListHeader';
import AddNewStock from './AddNewStock/AddNewStock';
import { StyledIconButton } from '@/components/IconButton/IconButton';
import { StyledSummaryRow } from './StockItem/SummaryInfo/SummaryInfo';

type Props = {
  stockIds: string[];
};

function StockTable({ stockIds }: Props) {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const StyledTable = isMainGroupSelected
    ? StyledMainStockTable
    : StyledSubStockTable;

  return (
    <StyledTable>
      <Table>
        <StockListHeader />
        <TableBody>
          {stockIds.map(stockId => (
            <StockItem stockId={stockId} key={stockId} />
          ))}
          {isMainGroupSelected && <AddNewStock />}
        </TableBody>
      </Table>
    </StyledTable>
  );
}

export default memo(StockTable);

const StyledStockTableBase = styled('div')`
  overflow-x: overlay;

  th,
  td {
    font-size: 0.8rem;
  }

  thead tr > th {
    font-weight: 500;
    position: sticky;
    z-index: 2;
    top: 0;
  }

  tbody tr td {
    background: ${({ theme }) => theme.colors.white};
  }

  tbody tr:hover td {
    background: ${({ theme }) => theme.colors.grey100};
  }

  ${StyledIconButton} {
    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey300};
    }
  }

  ${StyledSummaryRow} td {
    border-top: 2px solid ${({ theme }) => theme.colors.grey400};
  }

  ${StyledSummaryRow}:first-child td {
    border-top: none;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    th,
    td,
    input {
      font-size: min(0.7rem, 3vw);
    }

    .check-all {
      min-width: 30px;
    }

    .stock-name {
      min-width: 70px;
    }

    .buy-id {
      min-width: 40px;
    }
  }
`;

const StyledMainStockTable = styled(StyledStockTableBase)`
  thead tr > :first-child,
  thead tr > :nth-child(2),
  thead tr > :nth-child(3) {
    z-index: 3;
    left: 0;
    top: 0;
  }
  thead tr > :nth-child(2) {
    left: 50px;
  }
  thead tr > :nth-child(3) {
    left: 230px;
  }

  tbody tr > :first-child,
  tbody tr > :nth-child(2),
  tbody tr > td:nth-child(3) {
    position: sticky;
    z-index: 1;
    left: 0;
  }

  tbody tr > td[colspan='2']:nth-child(3) {
    position: static;
    z-index: auto;
    left: auto;
  }

  tbody tr > :nth-child(2) {
    left: 50px;
  }
  tbody tr > td:nth-child(3) {
    left: 230px;
  }
  tbody tr > td[colspan='2']:nth-child(3) {
    left: auto;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    thead tr > :nth-child(2) {
      left: 30px;
    }
    thead tr > :nth-child(3) {
      left: 100px;
    }

    tbody tr > :nth-child(2) {
      left: 30px;
    }
    tbody tr > td:nth-child(3) {
      left: 100px;
    }
    tbody tr > td[colspan='2']:nth-child(3) {
      left: auto;
    }
  }
`;

const StyledSubStockTable = styled(StyledStockTableBase)`
  thead tr > :first-child,
  thead tr > :nth-child(2) {
    z-index: 3;
    left: 0;
    top: 0;
  }
  thead tr > :nth-child(2) {
    left: 120px;
  }

  tbody tr > :first-child,
  tbody tr > td:nth-child(2) {
    position: sticky;
    z-index: 1;
    left: 0px;
  }
  tbody tr > td[colspan='2']:nth-child(2) {
    position: static;
    z-index: auto;
    left: auto;
  }

  tbody tr > td:nth-child(2) {
    left: 120px;
  }
  tbody tr > td[colspan='2']:nth-child(2) {
    left: auto;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    thead tr > :nth-child(2) {
      left: 70px;
    }

    tbody tr > td:nth-child(2) {
      left: 70px;
    }
    tbody tr > td[colspan='2']:nth-child(2) {
      left: auto;
    }
  }
`;
