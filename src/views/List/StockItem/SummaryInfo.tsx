import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BorderButton } from '../../../components/Button';
import {
  BaseInput,
  Input,
  OnInputChangeType,
  TransformedValue,
} from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import {
  deleteStock,
  selectStockInfoById,
  StockMainInfo,
} from '../../../features/stockList/stockListSlice';
import {
  NumberCell,
  LockButton,
  DeleteButton,
  CheckboxCell,
} from './components';
import { getGroupPurchasedData, getSummaryInfo } from './utils';
import { updateStock } from '../../../features/stockList/stockListSlice';
import {
  selectStockCheckedInfo,
  updateCheckedItems,
} from '../../../features/checkedItems/checkedItemsSlice';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../features/groups/groupsSlice';

export type SummaryInfoData = {
  purchaseQuantitySum: number;
  purchasePriceAverage: number;
  totalPurchasePrice: number;
  evaluationPrice: number;
  evaluationProfit: number;
  profitRate: number;
};

export interface SummaryInfoProps {
  stockId: string;
}

const SummaryInfo = ({ stockId }: SummaryInfoProps) => {
  const dispatch = useDispatch();
  const [isLock, setIsLock] = useState(true);

  const checkedInfo = useSelector(selectStockCheckedInfo(stockId));
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const groupPurchasedIds = groupInfo.stocks.byId[stockId];
  const purchasedItems = isMainGroupSelected
    ? stockInfo.purchasedItems
    : getGroupPurchasedData(stockInfo.purchasedItems, groupPurchasedIds);
  const summaryData = getSummaryInfo(stockInfo.mainInfo, purchasedItems);
  const formattedCurrentPrice = stockInfo.mainInfo.currentPrice.toString();
  const formattedEvaluationProfit =
    summaryData.evaluationProfit.toLocaleString();
  const formattedProfitRate = `${summaryData.profitRate
    .toFixed(2)
    .toLocaleString()} %`;

  const toggleLock = () => setIsLock((prev) => !prev);

  const onChangeCheckbox = (value: boolean) => {
    dispatch(
      updateCheckedItems({
        type: 'stock',
        checked: value,
        stockId: stockId,
      }),
    );
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    transformedValue: TransformedValue,
    fieldName: keyof Omit<StockMainInfo, 'stockId'>,
  ) => {
    if (fieldName === 'currentPrice' && transformedValue === null) return;
    const value =
      fieldName === 'stockName'
        ? e.target.value
        : (transformedValue && transformedValue[1]) ||
          e.target.value.replaceAll(',', '');
    dispatch(
      updateStock({
        stockId: stockId,
        fieldName: fieldName,
        value,
      }),
    );
  };
  const onStockNameChange: OnInputChangeType = (e, transformedValue) =>
    onInputChange(e, transformedValue, 'stockName');
  const onCurrentPriceChange: OnInputChangeType = (e, transformedValue) =>
    onInputChange(e, transformedValue, 'currentPrice');

  const onDeleteStock = () => {
    dispatch(deleteStock(stockId));
  };

  return (
    <StyledSummaryRow>
      <CheckboxCell onClick={onChangeCheckbox} value={checkedInfo.allChecked} />
      <TableCell>
        <Input
          fullWidth
          onChange={onStockNameChange}
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
          fullWidth
          onChange={onCurrentPriceChange}
          type='number'
          value={formattedCurrentPrice}
          disabled={isLock}
        />
      </TableCell>
      <NumberCell value={summaryData.evaluationPrice} />
      <TableCell align='right'>{formattedEvaluationProfit}</TableCell>
      <TableCell align='right'>{formattedProfitRate} </TableCell>
      <LockButton isLock={isLock} onClick={toggleLock} />
      <DeleteButton onClick={onDeleteStock} />
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
