import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../features/groups/selectors';
import { Table, TableBody } from '../../components/Table';
import StockItem from './StockItem/StockItem';
import StockListHeader from './StockListHeader';
import { AddNewStock } from './AddNewStock/AddNewStock';

const StockTable = () => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const stockIds = groupInfo.stocks.allIds;
  return (
    <StyledStockTable>
      <Table>
        <StockListHeader />
        <TableBody>
          {stockIds.map((stockId) => (
            <StockItem stockId={stockId} key={stockId} />
          ))}
          {isMainGroupSelected && <AddNewStock />}
        </TableBody>
      </Table>
    </StyledStockTable>
  );
};

export default StockTable;

const StyledStockTable = styled('div')`
  width: 100%;
  height: fit-content;
  max-height: calc(100vh - 376px);
  overflow: auto;

  thead tr > th {
    position: sticky;
    z-index: 2;
    top: 0;
  }

  thead tr > :first-child {
    z-index: 3;
    left: 0;
    top: 0;
  }
  thead tr > :nth-child(2) {
    z-index: 3;
    left: 50px;
  }
  thead tr > :nth-child(3) {
    z-index: 3;
    left: 170px;
  }

  tbody tr > :first-child {
    background: white;
    position: sticky;
    z-index: 1;
    left: 0;
  }
  tbody tr > :nth-child(2) {
    background: white;
    position: sticky;
    z-index: 1;
    left: 50px;
  }
  tbody tr > :nth-child(3):not(.stock-summary) {
    background: white;
    position: sticky;
    z-index: 1;
    left: 170px;
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

    thead tr > :nth-child(2) {
      z-index: 3;
      left: 30px;
    }
    thead tr > :nth-child(3) {
      z-index: 3;
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
