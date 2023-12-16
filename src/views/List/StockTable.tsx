import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { selectIsMainGroupSelected } from '../../features/groups/selectors';
import { Table, TableBody } from '../../components/Table';
import StockItem from './StockItem/StockItem';
import StockListHeader from './Header/StockListHeader';
import AddNewStock from './AddNewStock/AddNewStock';
import { selectStockIds } from '../../features/selectors';

const StockTable = () => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const stockIds = useSelector(selectStockIds);
  const StyledTable = isMainGroupSelected ? StyledMainStockTable : StyledSubStockTable;

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
};

export default StockTable;

const StyledStockTableBase = styled('div')`
  width: 100%;
  height: fit-content;
  max-height: calc(100vh - 376px);
  overflow: auto;

  thead tr > th {
    position: sticky;
    z-index: 2;
    top: 0;
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
    left: 170px;
  }

  tbody tr > :first-child,
  tbody tr > :nth-child(2),
  tbody tr > :nth-child(3):not(.stock-summary) {
    background: ${({ theme }) => theme.colors.grey100};
    position: sticky;
    z-index: 1;
    left: 0;
  }
  tbody tr > :nth-child(2) {
    left: 50px;
  }
  tbody tr > :nth-child(3):not(.stock-summary) {
    left: 170px;
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
    tbody tr > :nth-child(3):not(.stock-summary) {
      left: 100px;
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
  tbody tr > :nth-child(2):not(.stock-summary) {
    background: ${({ theme }) => theme.colors.grey100};
    position: sticky;
    z-index: 1;
    left: 0px;
  }

  tbody tr > :nth-child(2):not(.stock-summary) {
    left: 120px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    thead tr > :nth-child(2) {
      left: 70px;
    }

    tbody tr > :nth-child(2):not(.stock-summary) {
      left: 70px;
    }
  }
`;
