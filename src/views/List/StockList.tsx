import React from 'react';
import styled from 'styled-components';
import { ContainedButton } from '../../components/Button';
import { BaseInput } from '../../components/Input';
import { Table, TableBody, TableCell, TableRow } from '../../components/Table';
import StockItem, { StockInfoData } from './StockItem/StockItem';
import StockListHeader from './StockListHeader';

interface StockListProps {}

const StockList: React.FC<StockListProps> = () => {
  return (
    <StyledStockList>
      <Table>
        <StockListHeader />
        <TableBody>
          <StockItem purchasedStockList={MOCK_DATA} />
          <StockItem purchasedStockList={MOCK_DATA} />
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
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <ContainedButton color='secondary2' fullWidth>
          신규 종목 추가
        </ContainedButton>
      </TableCell>
    </TableRow>
  );
};

const MOCK_DATA: StockInfoData[] = [
  {
    stockName: '구글',
    stockId: 1,
    purchasedId: 1,
    currentPrice: 100,
    purchaseDate: '2023-04-04T09:57:11',
    purchaseQuantity: 100,
    purchasePrice: 200,
  },
  {
    stockName: '구글',
    stockId: 1,
    currentPrice: 300,
    purchasedId: 2,
    purchaseDate: '2023-04-04T09:57:11',
    purchaseQuantity: 201,
    purchasePrice: 202,
  },
];
