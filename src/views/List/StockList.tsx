import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ContainedButton } from '../../components/Button';
import { BaseInput } from '../../components/Input';
import { Table, TableBody, TableCell, TableRow } from '../../components/Table';
import { addNewStock } from '../../features/stockList/stockListSlice';
import { RootState } from '../../store';
import StockItem from './StockItem/StockItem';
import StockListHeader from './StockListHeader';

interface StockListProps {}

const StockList: React.FC<StockListProps> = () => {
  const stocks = useSelector((state: RootState) => state.stockList.stocks);
  const stocksArray = Object.values(stocks);
  return (
    <StyledStockList>
      <Table>
        <StockListHeader />
        <TableBody>
          {stocksArray.map((stock) => (
            <StockItem stockInfo={stock} key={stock.mainInfo.stockId} />
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

const AddNewStock: React.FC = () => {
  const dispatch = useDispatch();
  const onAddNewStock = () => {
    dispatch(addNewStock());
  };
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <ContainedButton onClick={onAddNewStock} color='secondary2' fullWidth>
          신규 종목 추가
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};
