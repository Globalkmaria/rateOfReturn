import { Dispatch, SetStateAction, memo } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from '../../../../components/Input';
import { TableCell } from '../../../../components/Table';
import { PurchasedItemInfo } from '../../../../features/stockList/type';
import { updatePurchaseItem } from '../../../../features/stockList/stockListSlice';
import { InputCell } from '../components';
import {
  ChangedPurchasedItemInputs,
  PurchasedInputChangeProps,
} from './PurchasedStock';

type Props = {
  purchasedItem: PurchasedItemInfo;
  isLock: boolean;
  stockId: string;
  purchasedId: string;
  setChangedInputs: Dispatch<SetStateAction<ChangedPurchasedItemInputs>>;
};

const PurchasedInput = ({
  isLock,
  purchasedItem,
  setChangedInputs,
  stockId,
  purchasedId,
}: Props) => {
  const dispatch = useDispatch();
  const onInputChange: PurchasedInputChangeProps = (e, transformedValue) => {
    const fieldName = e.target.name as keyof Omit<
      PurchasedItemInfo,
      'purchasedId'
    >;
    if (fieldName !== 'purchasedDate' && transformedValue === null) return;

    const value =
      fieldName === 'purchasedDate'
        ? e.target.value.replace(/\:[\d]{2}.[\d]{3}Z/, '')
        : (transformedValue && transformedValue[1]) ||
          e.target.value.replaceAll(',', '');

    setChangedInputs((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    dispatch(
      updatePurchaseItem({
        stockId: stockId,
        purchasedId: purchasedId,
        fieldName,
        value,
      }),
    );
  };

  return (
    <>
      <TableCell>
        <div className='datetime'>
          <Input
            className='date'
            name='purchasedDate'
            onChange={onInputChange}
            disabled={isLock}
            type='date'
            value={purchasedItem.purchasedDate}
            fullWidth
            aria-label='purchased date'
          />
          <Input
            className='date'
            name='purchasedTime'
            onChange={onInputChange}
            disabled={isLock}
            type='time'
            aria-label='purchased time'
            value={purchasedItem.purchasedTime}
            fullWidth
          />
        </div>
      </TableCell>
      <InputCell
        name='purchasedQuantity'
        onChange={onInputChange}
        value={purchasedItem.purchasedQuantity}
        disabled={isLock}
        aria-label='purchased quantity'
      />
      <InputCell
        name='purchasedPrice'
        onChange={onInputChange}
        onBlur={onInputChange}
        value={purchasedItem.purchasedPrice}
        aria-label='purchased price'
        disabled={isLock}
      />
    </>
  );
};

export default memo(PurchasedInput);
