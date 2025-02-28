import { memo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { selectStockInfoById } from '@/features/stockList/selectors';
import {
  selectIsStockListEditMode,
  selectTemporalStockMainInfoById,
} from '@/features/temporalStockList/selectors';
import { updateTemporalStock } from '@/features/temporalStockList/temporalStockListSlice';

import { TransformedValue } from '@/components/Input/BaseInput';

import { Input } from '../../../../components/Input/Input';
import { TableCell } from '../../../../components/Table';
import { InputCell, NumberCell, ProfitRate } from '../components';
import { useGetStockSummaryData } from './hooks/useGetStockSummaryData';
import StockTag from './StockTag';
import { checkCurrentPrice, checkStockName } from '../validity';
import { getNameAndValue } from './helper';

type Props = {
  stockId: string;
};

const SummaryContent = ({ stockId }: Props) => {
  const dispatch = useDispatch();
  const focusedInput = useRef<HTMLInputElement>(null);
  const temporalStockMainInfo = useSelector(
    selectTemporalStockMainInfoById(stockId),
  );
  const { mainInfo: stockMainInfo } = useSelector(selectStockInfoById(stockId));
  const summaryData = useGetStockSummaryData(stockId);
  const isEditMode = useSelector(selectIsStockListEditMode);
  const isLock = !isEditMode;

  const stockName = temporalStockMainInfo?.stockName ?? stockMainInfo.stockName;
  const formattedCurrentPrice =
    temporalStockMainInfo?.currentPrice ?? stockMainInfo.currentPrice;
  const selectedOption = temporalStockMainInfo?.tag ?? stockMainInfo.tag;

  const onInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      transformedValue: TransformedValue,
    ) => {
      const result = getNameAndValue(e, transformedValue);
      if (!result) return;

      dispatch(
        updateTemporalStock({
          stockId,
          name: result.name,
          value: result.value,
        }),
      );
    },
    [stockId, dispatch],
  );

  const onTagChange = useCallback(
    (value: string) =>
      dispatch(updateTemporalStock({ stockId, name: 'tag', value })),
    [stockId],
  );

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
      <ProfitRate profitRate={summaryData.profitRate} />
    </>
  );
};

export default memo(SummaryContent);

const StyledStockName = styled(Input)`
  font-weight: 500;
`;
