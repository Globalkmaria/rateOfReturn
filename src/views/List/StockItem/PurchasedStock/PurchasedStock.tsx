import { ChangeEvent, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { EditUserItemServiceData } from '@/service/userStocks/type';

import { TransformedValue } from '../../../../components/Input/BaseInput';
import { TableRow } from '../../../../components/Table';
import { updateCheckedItems } from '../../../../features/checkedItems/checkedItemsSlice';
import { selectIsPurchasedItemChecked } from '../../../../features/checkedItems/selectors';
import useIsMainGroup from '../../hooks/useIsMainGroup';
import { CheckboxCell } from '../components';
import PurchasedContent from './PurchasedContent';
import PurchasedMainGroupAction from './PurchasedMainGroupAction';
import PurchasedOtherGroupAction from './PurchasedOtherGroupAction';

export type SetChangedInputByFieldName = <
  T extends keyof EditUserItemServiceData,
>(
  fieldName: T,
  value: EditUserItemServiceData[T],
) => void;

export type PurchasedInputChangeProps = (
  e: ChangeEvent<HTMLInputElement>,
  transformedValue: TransformedValue,
) => void;

interface PurchasedStockProps {
  stockId: string;
  purchasedId: string;
}

const PurchasedStock = ({ stockId, purchasedId }: PurchasedStockProps) => {
  const dispatch = useDispatch();

  const isPurchasedItemChecked = useSelector(
    selectIsPurchasedItemChecked(stockId, purchasedId),
  );
  const isMainGroupSelected = useIsMainGroup();
  const onChangeCheckbox = useCallback(
    (value: boolean) =>
      dispatch(
        updateCheckedItems({
          type: 'purchased',
          checked: value,
          stockId,
          purchasedId,
        }),
      ),
    [stockId, purchasedId],
  );

  return (
    <StyledPurchasedStock data-testid='current__purchased'>
      {isMainGroupSelected ? (
        <CheckboxCell
          title='Check item'
          disabled={!isMainGroupSelected}
          onClick={onChangeCheckbox}
          value={isPurchasedItemChecked}
        />
      ) : null}
      <PurchasedContent stockId={stockId} purchasedId={purchasedId} />
      {isMainGroupSelected ? (
        <PurchasedMainGroupAction stockId={stockId} purchasedId={purchasedId} />
      ) : (
        <PurchasedOtherGroupAction
          stockId={stockId}
          purchasedId={purchasedId}
        />
      )}
    </StyledPurchasedStock>
  );
};

export default memo(PurchasedStock);

const StyledPurchasedStock = styled(TableRow)`
  height: 46px;
`;
