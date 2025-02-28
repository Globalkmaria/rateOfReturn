import { memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { EditUserItemServiceData } from '@/service/userStocks/type';

import { selectTemporalPurchasedItemsById } from '@/features/temporalStockList/selectors';
import { updateTemporalPurchaseItem } from '@/features/temporalStockList/temporalStockListSlice';

import { Input } from '../../../../components/Input/Input';
import { TableCell } from '../../../../components/Table';
import { PurchasedItemInfo } from '../../../../features/stockList/type';
import { InputCell } from '../components';
import { PurchasedInputChangeProps } from './PurchasedStock';
import { checkCurrentPrice, checkQuantity } from '../validity';

type Props = {
  purchasedItem: PurchasedItemInfo;
  isLock: boolean;
  stockId: string;
};

const PurchasedInput = ({ isLock, purchasedItem, stockId }: Props) => {
  const dispatch = useDispatch();
  const focusedInput = useRef<HTMLInputElement>(null);
  const temporalPurchasedItem = useSelector(
    selectTemporalPurchasedItemsById(stockId, purchasedItem.purchasedId),
  );

  const combinedPurchasedItem = {
    ...purchasedItem,
    ...temporalPurchasedItem,
  };

  const onInputChange: PurchasedInputChangeProps = (e, transformedValue) => {
    const fieldName = e.target.name as keyof EditUserItemServiceData;
    if (transformedValue === null) return;

    const value = Array.isArray(transformedValue)
      ? transformedValue[0]
      : transformedValue;

    dispatch(
      updateTemporalPurchaseItem({
        stockId,
        purchasedId: purchasedItem.purchasedId,
        name: fieldName,
        value,
      }),
    );
  };

  return (
    <>
      <TableCell>
        <StyledDateTime>
          <Input
            name='purchasedDate'
            onChange={onInputChange}
            disabled={isLock}
            type='date'
            value={combinedPurchasedItem.purchasedDate}
            fullWidth
            aria-label='purchased date'
            ref={focusedInput}
          />
          <Input
            name='purchasedTime'
            onChange={onInputChange}
            disabled={isLock}
            type='time'
            aria-label='purchased time'
            value={combinedPurchasedItem.purchasedTime}
            fullWidth
          />
        </StyledDateTime>
      </TableCell>
      <InputCell
        name='purchasedQuantity'
        onChange={onInputChange}
        value={combinedPurchasedItem.purchasedQuantity}
        disabled={isLock}
        aria-label='purchased quantity'
        validation={checkQuantity}
      />
      <InputCell
        withFixed
        type='decimal'
        name='purchasedPrice'
        onChange={onInputChange}
        value={combinedPurchasedItem.purchasedPrice}
        aria-label='purchased price'
        disabled={isLock}
        validation={checkCurrentPrice}
      />
    </>
  );
};

export default memo(PurchasedInput);

const StyledDateTime = styled.div`
  display: flex;
  gap: 5px;
`;
