import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { updateCheckedItems } from '../../../../features/checkedItems/checkedItemsSlice';
import { selectIsPurchasedItemChecked } from '../../../../features/checkedItems/selectors';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import { selectPurchasedItemsById } from '../../../../features/stockList/selectors';
import {
  updatePurchaseItem,
  updatePurchaseItemNeedInit,
} from '../../../../features/stockList/stockListSlice';
import { EditUserItemServiceData } from '../../../../service/userStocks/type';
import { selectIsLoggedIn } from '../../../../features/user/selectors';

import { TableRow } from '../../../../components/Table';
import { BorderButton } from '../../../../components/Button';
import { TransformedValue } from '../../../../components/Input/BaseInput';
import userStocksService from '../../../../service/userStocks/userStocks';
import { CheckboxCell } from '../components';
import PurchasedContent from './PurchasedContent';
import { getChangedPurchasedData } from './utils';
import { checkNoChange } from '../utils';
import PurchasedMainGroupAction from './PurchasedMainGroupAction';
import PurchasedOtherGroupAction from './PurchasedOtherGroupAction';

export type SetChangedInputByFieldName = <
  T extends keyof ChangedPurchasedItemInputs,
>(
  fieldName: T,
  value: ChangedPurchasedItemInputs[T],
) => void;

export type PurchasedInputChangeProps = (
  e: ChangeEvent<HTMLInputElement>,
  transformedValue: TransformedValue | null,
) => void;

interface PurchasedStockProps {
  stockId: string;
  purchasedId: string;
}

export type ChangedPurchasedItemInputs = EditUserItemServiceData;

const PurchasedStock = ({ stockId, purchasedId }: PurchasedStockProps) => {
  const dispatch = useDispatch();

  const { purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );
  const isPurchasedItemChecked = useSelector(
    selectIsPurchasedItemChecked(stockId, purchasedId),
  );
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isLock, setIsLock] = useState(!purchasedItem.needInit);
  const [changedInputs, setChangedInputs] =
    useState<ChangedPurchasedItemInputs>({});

  const setChangedInputByFieldName = useCallback<SetChangedInputByFieldName>(
    (fieldName, value) => {
      setChangedInputs(prev => ({ ...prev, [fieldName]: value }));
    },
    [],
  );

  const onChangeCheckbox = (value: boolean) =>
    dispatch(
      updateCheckedItems({
        type: 'purchased',
        checked: value,
        stockId,
        purchasedId,
      }),
    );

  const onToggleLock = async () => {
    if (purchasedItem.needInit)
      dispatch(updatePurchaseItemNeedInit({ stockId, purchasedId }));
    if (isLock) return setIsLock(false);

    if (checkNoChange(changedInputs)) return setIsLock(true);

    if (isLoggedIn) {
      const result = await userStocksService.editUserItem({
        stockId,
        itemId: purchasedId,
        data: changedInputs,
      });
      if (!result.success) return alert(result.message);
    }

    const purchasedData = getChangedPurchasedData(purchasedItem, changedInputs);
    dispatch(updatePurchaseItem({ stockId, purchasedId, purchasedData }));

    setChangedInputs({});
    setIsLock(true);
  };

  useEffect(() => {
    if (isMainGroupSelected && purchasedItem.needInit)
      setIsLock(!purchasedItem.needInit);
    else setIsLock(true);
  }, [isMainGroupSelected]);

  useEffect(() => {
    return () => {
      if (purchasedItem.needInit)
        dispatch(updatePurchaseItemNeedInit({ stockId, purchasedId }));
    };
  }, []);

  return (
    <StyledPurchasedStock>
      {isMainGroupSelected ? (
        <CheckboxCell
          title='Check item'
          disabled={!isMainGroupSelected}
          onClick={onChangeCheckbox}
          value={isPurchasedItemChecked}
        />
      ) : null}
      <PurchasedContent
        stockId={stockId}
        purchasedId={purchasedId}
        changedInputs={changedInputs}
        isLock={isLock}
        setChangedInputByFieldName={setChangedInputByFieldName}
      />
      {isMainGroupSelected ? (
        <PurchasedMainGroupAction
          stockId={stockId}
          purchasedId={purchasedId}
          isLock={isLock}
          onToggleLock={onToggleLock}
        />
      ) : (
        <PurchasedOtherGroupAction
          stockId={stockId}
          purchasedId={purchasedId}
          isLock={isLock}
        />
      )}
    </StyledPurchasedStock>
  );
};

export default memo(PurchasedStock);

const StyledPurchasedStock = styled(TableRow)`
  background: ${({ theme }) => theme.colors.white};
  height: 46px;

  &:hover {
    background: ${({ theme }) => theme.colors.indigo000};
  }

  ${BorderButton} {
    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey400};
    }
  }
`;
