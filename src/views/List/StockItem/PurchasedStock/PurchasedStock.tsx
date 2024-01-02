import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { updateCheckedItems } from '../../../../features/checkedItems/checkedItemsSlice';
import { selectIsPurchasedItemChecked } from '../../../../features/checkedItems/selectors';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import { selectPurchasedItemNeedInit } from '../../../../features/stockList/selectors';
import { updatePurchaseItemNeedInit } from '../../../../features/stockList/stockListSlice';
import { EditUserItemServiceData } from '../../../../service/userStocks/type';

import { TableRow } from '../../../../components/Table';
import { BorderButton } from '../../../../components/Button';
import { TransformedValue } from '../../../../components/Input/BaseInput';
import useModal from '../../hooks/useModal';
import { DeleteButton, CheckboxCell } from '../components';
import { DeleteStockModal } from '../DeleteStockModal';
import PurchaseLock from './PurchaseLock';
import PurchasedContent from './PurchasedContent';

export type PurchasedInputChangeProps = (
  e: React.ChangeEvent<HTMLInputElement>,
  transformedValue: TransformedValue | null,
) => void;

interface PurchasedStockProps {
  stockId: string;
  purchasedId: string;
}

export type ChangedPurchasedItemInputs = EditUserItemServiceData;

const PurchasedStock = ({ stockId, purchasedId }: PurchasedStockProps) => {
  const dispatch = useDispatch();

  const isPurchasedItemChecked = useSelector(selectIsPurchasedItemChecked(stockId, purchasedId));
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const needInit = useSelector(selectPurchasedItemNeedInit(stockId, purchasedId));
  const [isLock, setIsLock] = useState(!needInit);
  const [changedInputs, setChangedInputs] = useState<ChangedPurchasedItemInputs>({});
  const { showModal, onOpenModal, onCloseModal } = useModal();

  const onChangeCheckbox = (value: boolean) => {
    dispatch(updateCheckedItems({ type: 'purchased', checked: value, stockId, purchasedId }));
  };

  useEffect(() => {
    if (isMainGroupSelected && needInit) setIsLock(!needInit);
    else setIsLock(true);
  }, [isMainGroupSelected]);

  useEffect(() => {
    return () => {
      if (needInit) {
        dispatch(updatePurchaseItemNeedInit({ stockId, purchasedId }));
      }
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
        setChangedInputs={setChangedInputs}
        isLock={isLock}
      />
      {isMainGroupSelected ? (
        <>
          <PurchaseLock
            isLock={isLock}
            setIsLock={setIsLock}
            stockId={stockId}
            purchasedId={purchasedId}
            changedInputs={changedInputs}
            setChangedInputs={setChangedInputs}
            needInit={needInit}
          />
          <DeleteButton onClick={onOpenModal} disabled={!isMainGroupSelected} />
          {showModal && (
            <DeleteStockModal type='purchase' stockId={stockId} purchasedId={purchasedId} onClose={onCloseModal} />
          )}
        </>
      ) : null}
    </StyledPurchasedStock>
  );
};

export default memo(PurchasedStock);

const StyledPurchasedStock = styled(TableRow)`
  background: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.indigo000};
  }

  ${BorderButton} {
    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey400};
    }
  }
`;
