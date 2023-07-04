import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BaseInput } from '../../components/Input';
import { Table, TableBody } from '../../components/Table';
import { selectStocks } from '../../features/stockList/selectors';
import StockItem from './StockItem/StockItem';
import StockListHeader from './StockListHeader';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../features/groups/selectors';
import GroupButtons from './GroupButtons/GroupButtons';
import GroupSummary from './GroupSummary/GroupSummary';
import { AddNewStock } from './AddNewStock';
import Backup from './Backup/Backup';

const StockList = () => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const stocks = useSelector(selectStocks);
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const info = isMainGroupSelected ? stocks.allIds : groupInfo.stocks.allIds;
  return (
    <StyledStockList>
      <div className='control-bar'>
        <div className='control-bar__left'>
          <GroupButtons />
        </div>
        <div className='control-bar__right'>
          <Backup />
        </div>
      </div>
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
    </StyledStockList>
  );
};

export default StockList;

const StyledStockList = styled('div')`
  ${BaseInput} {
    background: ${({ theme }) => theme.colors.grey300};

    &:disabled {
      background: none;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.grey900};
      opacity: 1;
    }
  }

  .control-bar {
    display: flex;
    justify-content: space-between;
  }
`;
