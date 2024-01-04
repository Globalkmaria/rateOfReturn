import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { TableCell } from '../../../../components/Table';
import { Input } from '../../../../components/Input/Input';
import { TransformedValue } from '../../../../components/Input/BaseInput';
import { selectStockInfoById } from '../../../../features/stockList/selectors';
import { NumberCell } from '../components';
import { useGetStockSummaryData } from './hooks/useGetStockSummaryData';
import { ChangedSummaryInputs } from './hooks/useStockSummaryInputChange';

type Props = {
  stockId: string;
  isLock: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, transformedValue: TransformedValue) => void;
  changedInputs: ChangedSummaryInputs;
};

const SummaryContent = ({ stockId, isLock, onInputChange, changedInputs }: Props) => {
  const focusedInput = useRef<HTMLInputElement>(null);
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const summaryData = useGetStockSummaryData(stockId);

  const stockName = changedInputs.stockName || stockInfo.mainInfo.stockName;
  const formattedCurrentPrice = changedInputs.currentPrice?.toString() || stockInfo.mainInfo.currentPrice.toString();

  useEffect(() => {
    if (!focusedInput.current?.disabled) focusedInput.current?.focus();
  }, [focusedInput.current?.disabled]);

  return (
    <>
      <TableCell>
        <StyledStockName
          aria-label='stock name'
          fullWidth
          onChange={onInputChange}
          name='stockName'
          value={stockName}
          disabled={isLock}
          ref={focusedInput}
        />
      </TableCell>
      <TableCell align='center' colSpan={2}>
        Summary
      </TableCell>
      <NumberCell value={summaryData.purchaseQuantitySum} />
      <NumberCell value={summaryData.purchasePriceAverage} />
      <StyledTotalPurchase value={summaryData.totalPurchasePrice} />
      <TableCell>
        <Input
          fullWidth
          aria-label='current price'
          onChange={onInputChange}
          onBlur={onInputChange}
          type='number'
          value={formattedCurrentPrice}
          disabled={isLock}
          name='currentPrice'
        />
      </TableCell>
      <NumberCell value={summaryData.evaluationPrice} />
      <TableCell align='right'>{summaryData.evaluationProfit}</TableCell>
      <StyledProfitRate align='right'>{summaryData.profitRate} </StyledProfitRate>
    </>
  );
};

export default memo(SummaryContent);

const StyledStockName = styled(Input)`
  font-weight: 700;
`;

const StyledTotalPurchase = styled(NumberCell)`
  && {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }
`;

const StyledProfitRate = styled(TableCell)`
  white-space: nowrap;
`;
