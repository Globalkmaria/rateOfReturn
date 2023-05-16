import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BaseInput } from '../../components/Input';
import { Table, TableBody } from '../../components/Table';
import { selectStocks } from '../../features/stockList/stockListSlice';
import StockItem from './StockItem/StockItem';
import StockListHeader from './StockListHeader';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../features/groups/groupsSlice';
import GroupButtons from './GroupButtons/GroupButtons';
import GroupSummary from './GroupSummary/GroupSummary';
import { DeleteStockModal } from './StockItem/DeleteStockModal';
import { selectStockModal } from '../../features/stockModal/stockModalSlice';
import { AddNewStock } from './AddNewStock';

const StockList = () => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const stocks = useSelector(selectStocks);
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const stockModalInfo = useSelector(selectStockModal);
  const info = isMainGroupSelected ? stocks.allIds : groupInfo.stocks.allIds;
  return (
    <StyledStockList>
      <GroupButtons />
      <GroupSummary />
      <Table>
        <StockListHeader />
        <TableBody>
          {info.map((stockId) => (
            <StockItem stockId={stockId} key={stockId} />
          ))}
          {isMainGroupSelected && <AddNewStock />}
        </TableBody>
      </Table>
      {stockModalInfo.isOpen && <DeleteStockModal />}
    </StyledStockList>
  );
};

export default StockList;

const StyledStockList = styled('div')`
  ${BaseInput} {
    background: ${({ theme }) => theme.colors.grey100};

    &:disabled {
      background: none;
    }
  }
`;
