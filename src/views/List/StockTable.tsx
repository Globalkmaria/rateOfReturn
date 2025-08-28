import { memo } from 'react';

import styled from 'styled-components';

import { StyledIconButton } from '@/components/IconButton/IconButton';

import StockListHeader from './Header/StockListHeader';
import useIsMainGroup from './hooks/useIsMainGroup';
import StockItem from './StockItem/StockItem';
import { StyledSummaryRow } from './StockItem/SummaryInfo/SummaryInfo';
import { Table, TableBody } from '../../components/table/Table';

type Props = {
  stockIds: string[];
};

function StockTable({ stockIds }: Props) {
  const isMainGroup = useIsMainGroup();

  const StyledTable = isMainGroup ? StyledMainStockTable : StyledSubStockTable;

  return (
    <StyledTable>
      <Table>
        <StockListHeader />
        <TableBody>
          {stockIds.map(stockId => (
            <StockItem stockId={stockId} key={stockId} />
          ))}
        </TableBody>
      </Table>
    </StyledTable>
  );
}

export default memo(StockTable);

const StyledStockTableBase = styled('div')`
  overflow-x: overlay;
  padding-bottom: 120px;

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
  thead tr > :nth-child(3),
  thead tr > :nth-child(4) {
    z-index: 3;
    left: 0;
    top: 0;
  }
  thead tr > :nth-child(2) {
    left: 50px;
  }
  thead tr > :nth-child(3) {
    left: 170px;
  }
  thead tr > :nth-child(4) {
    left: 350px;
  }

  tbody tr > :first-child,
  tbody tr > :nth-child(2),
  tbody tr > td:nth-child(3),
  tbody tr > td:nth-child(4) {
    position: sticky;
    z-index: 1;
    left: 0;
  }

  tbody tr > :nth-child(2) {
    left: 50px;
  }
  tbody tr > td:nth-child(3) {
    left: 170px;
  }
  tbody tr > td:nth-child(4) {
    left: 350px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    thead tr > :nth-child(2),
    thead tr > :nth-child(3) {
      position: static;
      z-index: auto;
      left: auto;
      top: auto;
    }

    thead tr > :first-child,
    thead tr > :nth-child(4) {
      z-index: 3;
      left: 0;
      top: 0;
    }

    thead tr > :nth-child(4) {
      left: 30px;
    }

    tbody tr > :nth-child(2),
    tbody tr > td:nth-child(3) {
      position: static;
      z-index: auto;
      left: auto;
    }

    tbody tr > :first-child,
    tbody tr > td:nth-child(4) {
      position: sticky;
      z-index: 1;
      left: 0;
    }

    tbody tr > td:nth-child(4) {
      left: 30px;
    }
  }
`;

const StyledSubStockTable = styled(StyledStockTableBase)`
  thead tr > :first-child,
  thead tr > :nth-child(2),
  thead tr > :nth-child(3) {
    z-index: 3;
    left: 0;
    top: 0;
  }
  thead tr > :nth-child(2) {
    left: 120px;
  }
  thead tr > :nth-child(3) {
    left: 300px;
  }

  tbody tr > :first-child,
  tbody tr > td:nth-child(2),
  tbody tr > td:nth-child(3) {
    position: sticky;
    z-index: 1;
    left: 0px;
  }

  tbody tr > td:nth-child(2) {
    left: 120px;
  }
  tbody tr > td:nth-child(3) {
    left: 300px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    thead tr > :first-child,
    thead tr > :nth-child(2) {
      position: static;
      z-index: auto;
      left: auto;
      top: auto;
    }

    thead tr > :nth-child(3) {
      z-index: 3;
      left: 0;
      top: 0;
    }

    tbody tr > :first-child,
    tbody tr > td:nth-child(2) {
      position: static;
      z-index: auto;
      left: auto;
    }

    tbody tr > td:nth-child(3) {
      position: sticky;
      z-index: 1;
      left: 0px;
    }
  }
`;
