import styled from 'styled-components/macro';

import { Input } from '../../../../components/Input/Input';
import { TableCell } from '../../../../components/Table';
import { PurchasedItemInfo } from '../../../../features/stockList/type';
import { InputCell } from '../components';
import { checkPurchasedItemValidity } from '../validity';
import { ChangedPurchasedItemInputs, PurchasedInputChangeProps, SetChangedInputByFieldName } from './PurchasedStock';
import { memo } from 'react';

type Props = {
  purchasedItem: PurchasedItemInfo;
  isLock: boolean;
  setChangedInputByFieldName: SetChangedInputByFieldName;
  changedInputs: ChangedPurchasedItemInputs;
};

const PurchasedInput = ({ isLock, purchasedItem, changedInputs, setChangedInputByFieldName }: Props) => {
  const onInputChange: PurchasedInputChangeProps = (e, transformedValue) => {
    const fieldName = e.target.name as keyof Omit<PurchasedItemInfo, 'purchasedId'>;
    if (transformedValue === null) return;

    const value = transformedValue[1];

    const validity = checkPurchasedItemValidity(fieldName, value);
    if (!validity.isValid) return alert(validity.message);

    setChangedInputByFieldName(fieldName, value);
  };

  return (
    <>
      <TableCell>
        <StyledDateTime>
          <StyledDate
            name='purchasedDate'
            onChange={onInputChange}
            disabled={isLock}
            type='date'
            value={changedInputs.purchasedDate || purchasedItem.purchasedDate}
            fullWidth
            aria-label='purchased date'
          />
          <StyledDate
            name='purchasedTime'
            onChange={onInputChange}
            disabled={isLock}
            type='time'
            aria-label='purchased time'
            value={changedInputs.purchasedTime || purchasedItem.purchasedTime}
            fullWidth
          />
        </StyledDateTime>
      </TableCell>
      <InputCell
        name='purchasedQuantity'
        onChange={onInputChange}
        onBlur={onInputChange}
        value={changedInputs.purchasedQuantity || purchasedItem.purchasedQuantity}
        disabled={isLock}
        aria-label='purchased quantity'
      />
      <InputCell
        name='purchasedPrice'
        onChange={onInputChange}
        onBlur={onInputChange}
        value={changedInputs.purchasedPrice || purchasedItem.purchasedPrice}
        aria-label='purchased price'
        disabled={isLock}
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
