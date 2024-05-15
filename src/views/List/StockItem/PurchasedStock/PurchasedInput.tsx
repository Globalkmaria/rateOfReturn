import { Dispatch, SetStateAction, memo, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { Input } from '../../../../components/Input/Input';
import { TableCell } from '../../../../components/Table';
import { PurchasedItemInfo } from '../../../../features/stockList/type';
import { InputCell } from '../components';
import { PurchasedInputChangeProps } from './PurchasedStock';
import { EditUserItemServiceData } from '@/service/userStocks/type';
import { checkCurrentPrice, checkQuantity } from '../validity';

type Props = {
  purchasedItem: PurchasedItemInfo;
  isLock: boolean;
  setChangedInputs: Dispatch<SetStateAction<EditUserItemServiceData>>;
  changedInputs: EditUserItemServiceData;
};

const PurchasedInput = ({
  isLock,
  purchasedItem,
  changedInputs,
  setChangedInputs,
}: Props) => {
  const focusedInput = useRef<HTMLInputElement>(null);

  const onInputChange: PurchasedInputChangeProps = (e, transformedValue) => {
    const fieldName = e.target.name as keyof EditUserItemServiceData;
    if (transformedValue === null) return;

    let value = transformedValue;
    if (fieldName === 'purchasedPrice' || fieldName === 'purchasedQuantity') {
      value = transformedValue[0];
    }

    setChangedInputs(prev => ({ ...prev, [fieldName]: value }));
  };

  useEffect(() => {
    if (!focusedInput.current?.disabled) focusedInput.current?.focus();
  }, [isLock]);

  return (
    <>
      <TableCell>
        <StyledDateTime>
          <StyledDate
            name='purchasedDate'
            onChange={onInputChange}
            disabled={isLock}
            type='date'
            value={changedInputs.purchasedDate ?? purchasedItem.purchasedDate}
            fullWidth
            aria-label='purchased date'
            ref={focusedInput}
          />
          <StyledDate
            name='purchasedTime'
            onChange={onInputChange}
            disabled={isLock}
            type='time'
            aria-label='purchased time'
            value={changedInputs.purchasedTime ?? purchasedItem.purchasedTime}
            fullWidth
          />
        </StyledDateTime>
      </TableCell>
      <InputCell
        name='purchasedQuantity'
        onChange={onInputChange}
        value={
          changedInputs.purchasedQuantity ?? purchasedItem.purchasedQuantity
        }
        disabled={isLock}
        aria-label='purchased quantity'
        validation={checkQuantity}
      />
      <InputCell
        withFixed
        type='decimal'
        name='purchasedPrice'
        onChange={onInputChange}
        value={changedInputs.purchasedPrice ?? purchasedItem.purchasedPrice}
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

const StyledDate = styled(Input)`
  font-size: 0.8rem;
`;
