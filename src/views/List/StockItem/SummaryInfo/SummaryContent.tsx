import { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { TableCell } from '../../../../components/Table';
import { Input } from '../../../../components/Input/Input';
import { TransformedValue } from '../../../../components/Input/BaseInput';
import { selectStockInfoById } from '../../../../features/stockList/selectors';
import { InputCell, NumberCell, StyledTextWrapper } from '../components';
import { useGetStockSummaryData } from './hooks/useGetStockSummaryData';
import { ChangedSummaryInputs } from './hooks/useStockSummaryInputChange';
import StockTag from './StockTag';
import { checkCurrentPrice, checkStockName } from '../validity';

type Props = {
  stockId: string;
  isLock: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    transformedValue: TransformedValue,
  ) => void;
  changedInputs: ChangedSummaryInputs;
  onTagChange: (option: string) => void;
};

const SummaryContent = ({
  stockId,
  isLock,
  onInputChange,
  changedInputs,
  onTagChange,
}: Props) => {
  const focusedInput = useRef<HTMLInputElement>(null);
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const summaryData = useGetStockSummaryData(stockId);

  const stockName = changedInputs.stockName ?? stockInfo.mainInfo.stockName;
  const formattedCurrentPrice =
    changedInputs.currentPrice ?? stockInfo.mainInfo.currentPrice;

  const selectedOption = changedInputs.tag ?? stockInfo.mainInfo.tag;

  useEffect(() => {
    if (!focusedInput.current?.disabled) focusedInput.current?.focus();
  }, [isLock]);

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
          validation={checkStockName}
        />
      </TableCell>
      <TableCell align='center'></TableCell>
      <StockTag
        disabled={isLock}
        selectedOption={selectedOption}
        onTagChange={onTagChange}
      />
      <NumberCell value={summaryData.purchaseQuantitySum} />
      <NumberCell withFixed value={summaryData.purchasePriceAverage} />
      <NumberCell withFixed value={summaryData.totalPurchasePrice} />
      <InputCell
        withFixed
        fullWidth
        type='decimal'
        aria-label='current price'
        onChange={onInputChange}
        value={formattedCurrentPrice}
        disabled={isLock}
        name='currentPrice'
        validation={checkCurrentPrice}
      />
      <NumberCell withFixed value={summaryData.evaluationPrice} />
      <NumberCell withFixed value={summaryData.evaluationProfit} />
      <StyledProfitRate align='right'>
        <StyledTextWrapper>{summaryData.profitRate} </StyledTextWrapper>
      </StyledProfitRate>
    </>
  );
};

export default memo(SummaryContent);

const StyledStockName = styled(Input)`
  font-weight: 500;
`;

const StyledProfitRate = styled(TableCell)`
  white-space: nowrap;
`;
