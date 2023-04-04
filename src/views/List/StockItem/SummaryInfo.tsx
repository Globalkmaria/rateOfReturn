import React, { useState } from 'react';
import styled from 'styled-components';
import { BorderButton } from '../../../components/Button';
import { BaseInput, Input } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import { NumberCell, LockButton, DeleteButton } from './components';
import { SummaryInfoData } from './StockItem';

export interface SummaryInfoProps {
  summaryInfoData: SummaryInfoData;
}

const SummaryInfo: React.FC<SummaryInfoProps> = ({ summaryInfoData }) => {
  const [isLock, setIsLock] = useState(true);
  const onLockButtonClick = () => setIsLock((prev) => !prev);
  const totalPurchasePrice =
    summaryInfoData.purchaseQuantitySum * summaryInfoData.purchasePriceAverage;
  const evaluationPrice =
    summaryInfoData.purchaseQuantitySum * summaryInfoData.currentPrice;
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const profitRate = (evaluationProfit / totalPurchasePrice) * 100;
  return (
    <StyledSummaryRow>
      <TableCell>
        <Input fullWidth value={summaryInfoData.stockName} disabled={isLock} />
      </TableCell>
      <TableCell align='center' colSpan={2}>
        요약
      </TableCell>
      <NumberCell value={summaryInfoData.purchaseQuantitySum} />
      <NumberCell value={summaryInfoData.purchasePriceAverage} />
      <NumberCell value={totalPurchasePrice} />
      <TableCell>
        <Input
          type='number'
          value={summaryInfoData.currentPrice.toString()}
          disabled={isLock}
        />
      </TableCell>
      <NumberCell value={evaluationPrice} />
      <TableCell align='right'>{evaluationProfit.toLocaleString()}</TableCell>
      <TableCell align='right'>
        {profitRate.toFixed(2).toLocaleString()} %
      </TableCell>
      <TableCell>
        <LockButton isLock={isLock} onClick={onLockButtonClick} />
      </TableCell>
      <TableCell>
        <DeleteButton />
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
