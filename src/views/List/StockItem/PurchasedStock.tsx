import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Input, OnInputChangeType } from '../../../components/Input';
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
  deleteCheckedItems,
  selectIsPurchasedItemChecked,
  updateCheckedItems,
} from '../../../features/checkedItems/checkedItemsSlice';
import {
  deletePurchaseItemFromGroup,
  selectIsMainGroupSelected,
} from '../../../features/groups/groupsSlice';

type InputChangeProps = (
  e: React.ChangeEvent<HTMLInputElement>,
  transformedValue: [string, string] | null,
  fieldName: keyof Omit<PurchasedItemInfo, 'purchasedId'>,
) => void;

interface PurchasedStockProps {
  stockId: string;
  purchasedId: string;
  purchasedIdx: number;
}

const PurchasedStock = ({ stockId, purchasedId }: PurchasedStockProps) => {
  const dispatch = useDispatch();
  const [isLock, setIsLock] = useState(true);
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );
  const isPurchasedItemChecked = useSelector(
    selectIsPurchasedItemChecked(stockId, purchasedId),
  );
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const totalPurchasePrice =
    purchasedItem.purchasedQuantity * purchasedItem.purchasedPrice;
  const evaluationPrice =
    purchasedItem.purchasedQuantity * mainInfo.currentPrice;
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const formattedEvaluationProfit = evaluationProfit.toLocaleString();
  const profitRate = (evaluationProfit / totalPurchasePrice) * 100;
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
  const onQuantityChange: OnInputChangeType = (e, transformedValue) =>
    onInputChange(e, transformedValue, 'purchasedQuantity');
  const onPriceChange: OnInputChangeType = (e, transformedValue) =>
    onInputChange(e, transformedValue, 'purchasedPrice');

  const onDeletePurchasedStock = () => {
    dispatch(deletePurchasedItem({ stockId, purchasedId }));
    dispatch(deletePurchaseItemFromGroup({ stockId, purchasedId }));
    dispatch(deleteCheckedItems({ stockId, purchasedId }));
  };

  useEffect(() => {
    setIsLock(true);
  }, [isMainGroupSelected]);

  return (
    <StyledPurchasedStockRow>
      <CheckboxCell
        disabled={!isMainGroupSelected}
        onClick={onChangeCheckbox}
        value={isPurchasedItemChecked}
      />
      <TableCell></TableCell>
      <TableCell align='center'>{purchasedId}</TableCell>
      <TableCell>
        <Input
          onChange={onDateChange}
          disabled={isLock}
          type='date'
          value={purchasedItem.purchasedDate}
          fullWidth
        />
      </TableCell>
      <InputCell
        onChange={onQuantityChange}
        value={purchasedItem.purchasedQuantity}
        disabled={isLock}
      />
      <InputCell
        onChange={onPriceChange}
        value={purchasedItem.purchasedPrice}
        disabled={isLock}
      />
      <NumberCell value={totalPurchasePrice} />
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
        onClick={onDeletePurchasedStock}
        disabled={!isMainGroupSelected}
      />
    </StyledPurchasedStockRow>
  );
};

export default PurchasedStock;

const StyledPurchasedStockRow = styled(TableRow)`
  &:hover {
    background: ${({ theme }) => theme.colors.yellow000};
  }
`;
