import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Input } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import {
  deletePurchasedItem,
  PurchasedItemInfo,
  StockMainInfo,
  updatePurchaseItem,
} from '../../../features/stockList/stockListSlice';
import { InputCell, NumberCell, LockButton, DeleteButton } from './components';

interface PurchasedStockProps {
  mainInfo: StockMainInfo;
  purchasedItem: PurchasedItemInfo;
  stockIdx: number;
  purchasedIdx: number;
}

const PurchasedStock: React.FC<PurchasedStockProps> = ({
  mainInfo,
  stockIdx,
  purchasedItem,
  purchasedIdx,
}) => {
  const dispatch = useDispatch();
  const [isLock, setIsLock] = useState(true);
  const toggleLock = () => setIsLock((prev) => !prev);
  const totalPurchasePrice =
    purchasedItem.purchasedQuantity * purchasedItem.purchasedPrice;
  const evaluationPrice =
    purchasedItem.purchasedQuantity * mainInfo.currentPrice;
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const profitRate = (evaluationProfit / totalPurchasePrice) * 100;

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: Omit<keyof PurchasedItemInfo, 'purchasedId'>,
  ) => {
    const value =
      fieldName === 'purchasedDate'
        ? e.target.value.replace(/\:[\d]{2}.[\d]{3}Z/, '')
        : e.target.value.replaceAll(',', '');
    dispatch(
      updatePurchaseItem({
        stockIdx: stockIdx,
        purchasedIdx: purchasedIdx,
        fieldName,
        value,
      }),
    );
  };

  const onDeletePurchasedStock = () => {
    dispatch(
      deletePurchasedItem({
        stockIdx,
        purchasedIdx,
      }),
    );
  };

  return (
    <StyledPurchasedStockRow>
      <TableCell></TableCell>
      <TableCell align='center'>{purchasedIdx + 1}</TableCell>
      <TableCell>
        <Input
          onChange={(e) => onInputChange(e, 'purchasedDate')}
          disabled={isLock}
          type='date'
          value={purchasedItem.purchasedDate}
        />
      </TableCell>
      <InputCell
        onChange={(e) => onInputChange(e, 'purchasedQuantity')}
        value={purchasedItem.purchasedQuantity}
        disabled={isLock}
      />
      <InputCell
        onChange={(e) => onInputChange(e, 'purchasedPrice')}
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
      <TableCell>
        <LockButton isLock={isLock} onClick={toggleLock} />
      </TableCell>
      <TableCell>
        <DeleteButton onClick={onDeletePurchasedStock} />
      </TableCell>
    </StyledPurchasedStockRow>
  );
};

export default PurchasedStock;

const StyledPurchasedStockRow = styled(TableRow)`
  &:hover {
    background: ${({ theme }) => theme.colors.yellow000};
  }
`;
