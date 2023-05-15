import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Input, OnInputChangeType } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import {
  PurchasedItemInfo,
  selectPurchasedItemsById,
  updatePurchaseItem,
} from '../../../features/stockList/stockListSlice';
import {
  InputCell,
  NumberCell,
  LockButton,
  DeleteButton,
  CheckboxCell,
} from './components';

import {
  selectIsPurchasedItemChecked,
  updateCheckedItems,
} from '../../../features/checkedItems/checkedItemsSlice';
import { selectIsMainGroupSelected } from '../../../features/groups/groupsSlice';
import { BorderButton } from '../../../components/Button';
import { openStockModal } from '../../../features/stockModal/stockModalSlice';

type InputChangeProps = (
  e: React.ChangeEvent<HTMLInputElement>,
  transformedValue: [string, string] | null,
  fieldName: keyof Omit<PurchasedItemInfo, 'purchasedId'>,
) => void;

interface PurchasedStockProps {
  stockId: string;
  purchasedId: string;
}

const PurchasedStock = ({ stockId, purchasedId }: PurchasedStockProps) => {
  const dispatch = useDispatch();
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );
  const isPurchasedItemChecked = useSelector(
    selectIsPurchasedItemChecked(stockId, purchasedId),
  );

  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const [isLock, setIsLock] = useState(false);

  const totalPurchasePrice =
    purchasedItem.purchasedQuantity * purchasedItem.purchasedPrice;
  const evaluationPrice =
    purchasedItem.purchasedQuantity * mainInfo.currentPrice;
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const formattedEvaluationProfit = evaluationProfit.toLocaleString();
  const profitRate = totalPurchasePrice
    ? (evaluationProfit / totalPurchasePrice) * 100
    : 0;
  const formattedProfitRate = `${profitRate.toFixed(2).toLocaleString()} %`;

  const toggleLock = () => setIsLock((prev) => !prev);

  const onChangeCheckbox = (value: boolean) => {
    dispatch(
      updateCheckedItems({
        type: 'purchased',
        checked: value,
        stockId: stockId,
        purchasedId: purchasedId,
      }),
    );
  };

  const onInputChange: InputChangeProps = (e, transformedValue, fieldName) => {
    if (fieldName !== 'purchasedDate' && transformedValue === null) return;
    const value =
      fieldName === 'purchasedDate'
        ? e.target.value.replace(/\:[\d]{2}.[\d]{3}Z/, '')
        : (transformedValue && transformedValue[1]) ||
          e.target.value.replaceAll(',', '');

    dispatch(
      updatePurchaseItem({
        stockId: stockId,
        purchasedId: purchasedId,
        fieldName,
        value,
      }),
    );
  };

  const onDateChange: OnInputChangeType = (e, transformedValue) =>
    onInputChange(e, transformedValue, 'purchasedDate');
  const onTimeChange: OnInputChangeType = (e, transformedValue) =>
    onInputChange(e, transformedValue, 'purchasedTime');
  const onQuantityChange: OnInputChangeType = (e, transformedValue) =>
    onInputChange(e, transformedValue, 'purchasedQuantity');
  const onPriceChange: OnInputChangeType = (e, transformedValue) =>
    onInputChange(e, transformedValue, 'purchasedPrice');

  const onOpenDeleteModal = () =>
    dispatch(openStockModal({ type: 'purchase', stockId, purchasedId }));
  useEffect(() => {
    setIsLock(true);
  }, [isMainGroupSelected]);

  return (
    <StyledPurchasedStockRow>
      <CheckboxCell
        title='Check item'
        disabled={!isMainGroupSelected}
        onClick={onChangeCheckbox}
        value={isPurchasedItemChecked}
      />
      <TableCell></TableCell>
      <TableCell align='center'>{purchasedId}</TableCell>
      <TableCell>
        <div className='datetime'>
          <Input
            className='date'
            onChange={onDateChange}
            disabled={isLock}
            type='date'
            value={purchasedItem.purchasedDate}
            fullWidth
          />
          <Input
            className='date'
            onChange={onTimeChange}
            disabled={isLock}
            type='time'
            value={purchasedItem.purchasedTime}
            fullWidth
          />
        </div>
      </TableCell>
      <InputCell
        onChange={onQuantityChange}
        value={purchasedItem.purchasedQuantity}
        disabled={isLock}
      />
      <InputCell
        onChange={onPriceChange}
        onBlur={onPriceChange}
        value={purchasedItem.purchasedPrice}
        disabled={isLock}
      />
      <NumberCell value={totalPurchasePrice} className='total-purchase' />
      <NumberCell value={mainInfo.currentPrice} />
      <NumberCell value={evaluationPrice} />
      <TableCell align='right'>{formattedEvaluationProfit}</TableCell>
      <TableCell align='right'>{formattedProfitRate}</TableCell>
      <LockButton
        isLock={isLock}
        onClick={toggleLock}
        disabled={!isMainGroupSelected}
      />
      <DeleteButton
        onClick={onOpenDeleteModal}
        disabled={!isMainGroupSelected}
      />
    </StyledPurchasedStockRow>
  );
};

export default PurchasedStock;

const StyledPurchasedStockRow = styled(TableRow)`
  .datetime {
    display: flex;
    gap: 5px;

    .date {
      font-size: 0.8rem;
    }
  }

  &:hover {
    background: ${({ theme }) => theme.colors.indigo000};
  }

  ${BorderButton} {
    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey400};
    }
  }

  .total-purchase {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }
`;
