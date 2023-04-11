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

const StockList = () => {
  const stocks = useSelector(selectStocks);
  return (
    <StyledStockList>
      <Table>
        <StockListHeader />
        <TableBody>
          {stocks.allIds.map((stockId) => (
            <StockItem stockId={stockId} key={stockId} />
          ))}
          <AddNewStock />
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
  };
  return (
    <TableRow>
      <TableCell colSpan={13}>
        <ContainedButton onClick={onAddNewStock} color='secondary2' fullWidth>
          신규 종목 추가
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};
