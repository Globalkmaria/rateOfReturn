import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { TableRow } from '../../../../components/Table';
import { updateCheckedItems } from '../../../../features/checkedItems/checkedItemsSlice';
import { selectIsPurchasedItemChecked } from '../../../../features/checkedItems/selectors';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import { BorderButton } from '../../../../components/Button';
import { EditUserItemServiceData } from '../../../../service/userStocks/type';
import useModal from '../../hooks/useModal';
import { DeleteButton, CheckboxCell } from '../components';
import { DeleteStockModal } from '../DeleteStockModal';
import PurchaseLock from './PurchaseLock';
import PurchasedContent from './PurchasedContent';

export type PurchasedInputChangeProps = (
  e: React.ChangeEvent<HTMLInputElement>,
  transformedValue: [string, string] | null,
) => void;

interface PurchasedStockProps {
  stockId: string;
  purchasedId: string;
}

export type ChangedPurchasedItemInputs = EditUserItemServiceData;

const PurchasedStock = ({ stockId, purchasedId }: PurchasedStockProps) => {
  const dispatch = useDispatch();
  const [isLock, setIsLock] = useState(true);
  const [changedInputs, setChangedInputs] = useState<ChangedPurchasedItemInputs>({});
  const { showModal, onOpenModal, onCloseModal } = useModal();

  const isPurchasedItemChecked = useSelector(selectIsPurchasedItemChecked(stockId, purchasedId));
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);

  const onChangeCheckbox = (value: boolean) => {
    dispatch(updateCheckedItems({ type: 'purchased', checked: value, stockId, purchasedId }));
  };

  useEffect(() => {
    setIsLock(true);
  }, [isMainGroupSelected]);

  return (
    <StyledPurchasedStockRow>
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
          />
          <DeleteButton onClick={onOpenModal} disabled={!isMainGroupSelected} />
          {showModal && (
            <DeleteStockModal type='purchase' stockId={stockId} purchasedId={purchasedId} onClose={onCloseModal} />
          )}
        </>
      ) : null}
    </StyledPurchasedStockRow>
  );
};

export default memo(PurchasedStock);

const StyledPurchasedStockRow = styled(TableRow)`
  background: ${({ theme }) => theme.colors.white};

  .stock-name {
    color: ${({ theme }) => theme.colors.subtitle};
  }

  .datetime {
    display: flex;
    gap: 5px;

    .date {
      font-size: 0.8rem;
    }
  }

  &:hover {
    background: ${({ theme }) => theme.colors.indigo000};
  }

  ${BorderButton} {
    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey400};
    }
  }

  .total-purchase {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }

  .date {
    width: 108px;
  }
`;
