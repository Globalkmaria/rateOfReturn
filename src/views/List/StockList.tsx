import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ContainedButton } from '../../components/Button';
import { BaseInput } from '../../components/Input';
import { Table, TableBody, TableCell, TableRow } from '../../components/Table';
import {
  addNewStock,
  selectStocks,
} from '../../features/stockList/stockListSlice';
import StockItem from './StockItem/StockItem';
import StockListHeader from './StockListHeader';
import { store } from '../../store';
import { addStockCheckInfo } from '../../features/checkedItems/checkedItemsSlice';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../features/groups/groupsSlice';
import GroupButtons from './GroupButtons/GroupButtons';

const StockList = () => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const stocks = useSelector(selectStocks);
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const info = isMainGroupSelected ? stocks.allIds : groupInfo.stocks.allIds;
  return (
    <StyledStockList>
      <GroupButtons />
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
    background: ${({ theme }) => theme.colors.grey100};

    &:disabled {
      background: none;
    }
  }
`;

const AddNewStock = () => {
  const dispatch = useDispatch();
  const onAddNewStock = () => {
    dispatch(addNewStock());
    const stocks = store.getState().stockList.stocks;
    const newStock = stocks.allIds[stocks.allIds.length - 1];
    dispatch(
      addStockCheckInfo({
        stockId: newStock,
        purchasedId: stocks.byId[newStock].purchasedItems.allIds[0],
      }),
    );
  };
  return (
    <TableRow>
      <TableCell colSpan={13}>
        <ContainedButton
          mode='light'
          onClick={onAddNewStock}
          color='secondary2'
          fullWidth
          title='Add new stock'
        >
          Add Stock
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};
