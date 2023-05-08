import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Input } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import {
  deletePurchasedItem,
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

interface PurchasedStockProps {
  stockId: string;
  purchasedId: string;
  purchasedIdx: number;
}

const PurchasedStock = ({
  stockId,
  purchasedId,
  purchasedIdx,
}: PurchasedStockProps) => {
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );
  const isPurchasedItemChecked = useSelector(
    selectIsPurchasedItemChecked(stockId, purchasedId),
  );
  const dispatch = useDispatch();
  const [isLock, setIsLock] = useState(true);
  const totalPurchasePrice =
    purchasedItem.purchasedQuantity * purchasedItem.purchasedPrice;
  const evaluationPrice =
    purchasedItem.purchasedQuantity * mainInfo.currentPrice;
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const profitRate = (evaluationProfit / totalPurchasePrice) * 100;

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
  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    transformedValue: [string, string] | null,
    fieldName: keyof Omit<PurchasedItemInfo, 'purchasedId'>,
  ) => {
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

  const onDeletePurchasedStock = () => {
    dispatch(
      deletePurchasedItem({
        stockId: stockId,
        purchasedId: purchasedId,
      }),
    );
  };

  return (
    <StyledPurchasedStockRow>
      <CheckboxCell onClick={onChangeCheckbox} value={isPurchasedItemChecked} />
      <TableCell></TableCell>
      <TableCell align='center'>{purchasedIdx + 1}</TableCell>
      <TableCell>
        <Input
          onChange={(e, transformedValue) =>
            onInputChange(e, transformedValue, 'purchasedDate')
          }
          disabled={isLock}
          type='date'
          value={purchasedItem.purchasedDate}
          fullWidth
        />
      </TableCell>
      <InputCell
        onChange={(e, transformedValue) =>
          onInputChange(e, transformedValue, 'purchasedQuantity')
        }
        value={purchasedItem.purchasedQuantity}
        disabled={isLock}
      />
      <InputCell
        onChange={(e, transformedValue) =>
          onInputChange(e, transformedValue, 'purchasedPrice')
        }
        value={purchasedItem.purchasedPrice}
        disabled={isLock}
      />
      <NumberCell value={totalPurchasePrice} />
      <NumberCell value={mainInfo.currentPrice} />
      <NumberCell value={evaluationPrice} />
      <TableCell align='right'>{evaluationProfit.toLocaleString()}</TableCell>
      <TableCell align='right'>
        {profitRate.toFixed(2).toLocaleString()} %
      </TableCell>
      <LockButton isLock={isLock} onClick={toggleLock} />
      <DeleteButton onClick={onDeletePurchasedStock} />
    </StyledPurchasedStockRow>
  );
};

export default PurchasedStock;

const StyledPurchasedStockRow = styled(TableRow)`
  &:hover {
    background: ${({ theme }) => theme.colors.yellow000};
  }
`;
