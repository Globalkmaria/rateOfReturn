import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { BorderButton } from '../../../components/Button';
import { BaseInput, Input } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import {
  deleteStock,
  StockList,
  StockMainInfo,
} from '../../../features/stockList/stockListSlice';
import { NumberCell, LockButton, DeleteButton } from './components';
import { getSummaryInfo } from './utils';
import { updateStock } from '../../../features/stockList/stockListSlice';

export type SummaryInfoData = {
  purchaseQuantitySum: number;
  purchasePriceAverage: number;
  totalPurchasePrice: number;
  evaluationPrice: number;
  evaluationProfit: number;
  profitRate: number;
};

export interface SummaryInfoProps {
  stockInfo: StockList;
  stockIdx: number;
}

const SummaryInfo: React.FC<SummaryInfoProps> = ({ stockInfo, stockIdx }) => {
  const dispatch = useDispatch();
  const [isLock, setIsLock] = useState(true);
  const summaryData = getSummaryInfo(stockInfo);

  const toggleLock = () => setIsLock((prev) => !prev);
  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof Omit<StockMainInfo, 'stockId'>,
  ) => {
    dispatch(
      updateStock({
        stockIdx: stockIdx,
        fieldName: fieldName,
        value: e.target.value,
      }),
    );
  };

  const onDeleteStock = () => {
    dispatch(deleteStock(stockIdx));
  };

  return (
    <StyledSummaryRow>
      <TableCell>
        <Input
          fullWidth
          onChange={(e) => onInputChange(e, 'stockName')}
          value={stockInfo.mainInfo.stockName}
          disabled={isLock}
        />
      </TableCell>
      <TableCell align='center' colSpan={2}>
        요약
      </TableCell>
      <NumberCell value={summaryData.purchaseQuantitySum} />
      <NumberCell value={summaryData.purchasePriceAverage} />
      <NumberCell value={summaryData.totalPurchasePrice} />
      <TableCell>
        <Input
          onChange={(e) => onInputChange(e, 'currentPrice')}
          type='number'
          value={stockInfo.mainInfo.currentPrice.toString()}
          disabled={isLock}
        />
      </TableCell>
      <NumberCell value={summaryData.evaluationPrice} />
      <TableCell align='right'>
        {summaryData.evaluationProfit.toLocaleString()}
      </TableCell>
      <TableCell align='right'>
        {summaryData.profitRate.toFixed(2).toLocaleString()} %
      </TableCell>
      <TableCell>
        <LockButton isLock={isLock} onClick={toggleLock} />
      </TableCell>
      <TableCell>
        <DeleteButton onClick={onDeleteStock} />
      </TableCell>
    </StyledSummaryRow>
  );
};

export default SummaryInfo;

export const StyledSummaryRow = styled(TableRow)`
  background: ${({ theme }) => theme.colors.grey100};

  ${TableCell} > ${BaseInput} {
    background: ${({ theme }) => theme.colors.grey300};
  }

  ${BorderButton} {
    border: ${({ theme }) => `1px solid ${theme.colors.grey400}`};

    &:hover {
      background: ${({ theme }) => theme.colors.grey300};
    }
  }
`;
