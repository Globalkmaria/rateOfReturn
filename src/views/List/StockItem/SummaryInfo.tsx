import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BorderButton } from '../../../components/Button';
import { BaseInput, Input, TransformedValue } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import { StockMainInfo } from '../../../features/stockList/type';
import { selectStockInfoById } from '../../../features/stockList/selectors';
import {
  NumberCell,
  LockButton,
  DeleteButton,
  CheckboxCell,
} from './components';

import { getGroupPurchasedData, getStockSummaryInfo } from './utils';
import { updateStock } from '../../../features/stockList/stockListSlice';
import { updateCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { selectStockCheckedInfo } from '../../../features/checkedItems/selectors';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../features/groups/selectors';
import { openStockModal } from '../../../features/stockModal/stockModalSlice';
import { DeleteModalProps } from './DeleteStockModal';

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
  const summaryData = getStockSummaryInfo(stockInfo.mainInfo, purchasedItems);
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
  ) => {
    const fieldName = e.target.name as keyof Omit<StockMainInfo, 'stockId'>;
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

  const onDeleteModalOpen = () => {
    const props: DeleteModalProps = {
      stockId,
      purchasedId: '',
      type: 'stock',
    };

    dispatch(
      openStockModal({
        modalName: 'DeleteStockModal',
        props,
      }),
    );
  };

  useEffect(() => {
    setIsLock(true);
  }, [isMainGroupSelected]);

  return (
    <StyledSummaryRow>
      <CheckboxCell
        disabled={!isMainGroupSelected}
        onClick={onChangeCheckbox}
        value={checkedInfo.allChecked}
        title='Check all group items'
      />
      <TableCell>
        <Input
          className='stockName'
          fullWidth
          onChange={onInputChange}
          name='stockName'
          value={stockInfo.mainInfo.stockName}
          disabled={isLock}
        />
      </TableCell>
      <TableCell align='center' colSpan={2}>
        Summary
      </TableCell>
      <NumberCell value={summaryData.purchaseQuantitySum} />
      <NumberCell value={summaryData.purchasePriceAverage} />
      <NumberCell
        className='total-purchase'
        value={summaryData.totalPurchasePrice}
      />
      <TableCell>
        <Input
          fullWidth
          name='currentPrice'
          onChange={onInputChange}
          onBlur={onInputChange}
          type='number'
          value={formattedCurrentPrice}
          disabled={isLock}
        />
      </TableCell>
      <NumberCell value={summaryData.evaluationPrice} />
      <TableCell align='right'>{formattedEvaluationProfit}</TableCell>
      <TableCell align='right'>{formattedProfitRate} </TableCell>
      <LockButton
        isLock={isLock}
        onClick={toggleLock}
        disabled={!isMainGroupSelected}
      />
      <DeleteButton
        onClick={onDeleteModalOpen}
        disabled={!isMainGroupSelected}
      />
    </StyledSummaryRow>
  );
};

export default SummaryInfo;

export const StyledSummaryRow = styled(TableRow)`
  background: ${({ theme }) => theme.colors.grey100};

  .stockName {
    font-weight: 700;
  }

  .total-purchase {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }

  ${TableCell} > ${BaseInput} {
    background: ${({ theme }) => theme.colors.grey300};
  }

  ${BorderButton} {
    border: ${({ theme }) => `1px solid ${theme.colors.grey400}`};

    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey300};
    }
  }
`;
