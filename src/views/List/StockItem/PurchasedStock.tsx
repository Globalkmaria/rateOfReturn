import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Input } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import { updatePurchaseItem } from '../../../features/stockList/stockListSlice';
import { PurchasedItemInfo } from '../../../features/stockList/type';
import { selectPurchasedItemsById } from '../../../features/stockList/selectors';
import {
  InputCell,
  NumberCell,
  DeleteButton,
  CheckboxCell,
  EditButton,
} from './components';

import { updateCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { selectIsPurchasedItemChecked } from '../../../features/checkedItems/selectors';
import { selectIsMainGroupSelected } from '../../../features/groups/selectors';
import { BorderButton } from '../../../components/Button';
import { openStockModal } from '../../../features/stockModal/stockModalSlice';
import { DeleteModalProps } from './DeleteStockModal';
import userStocksService from '../../../service/userStocks/userStocks';
import { EditUserItemServiceData } from '../../../service/userStocks/type';
import { selectIsLoggedIn } from '../../../features/user/selectors';

type InputChangeProps = (
  e: React.ChangeEvent<HTMLInputElement>,
  transformedValue: [string, string] | null,
) => void;

interface PurchasedStockProps {
  stockId: string;
  purchasedId: string;
}

type ChangedInputs = EditUserItemServiceData;

const PurchasedStock = ({ stockId, purchasedId }: PurchasedStockProps) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const [changedInputs, setChangedInputs] = useState<ChangedInputs>({});
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );
  const isPurchasedItemChecked = useSelector(
    selectIsPurchasedItemChecked(stockId, purchasedId),
  );

  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const [isLock, setIsLock] = useState(true);

  const totalPurchasePrice =
    purchasedItem.purchasedQuantity * purchasedItem.purchasedPrice;
  const evaluationPrice =
    purchasedItem.purchasedQuantity * mainInfo.currentPrice;
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const formattedEvaluationProfit = evaluationProfit.toLocaleString();
  const profitRate = totalPurchasePrice
    ? (evaluationProfit / totalPurchasePrice) * 100
    : 0;
  const formattedProfitRate = `${profitRate.toFixed(2).toLocaleString()} %`;

  const toggleLock = async () => {
    if (!isLoggedIn) {
      return setIsLock((prev) => !prev);
    }

    if (!isLock) {
      if (Object.keys(changedInputs).length === 0) return setIsLock(true);

      const result = await userStocksService.editUserItem({
        stockId,
        itemId: purchasedId,
        data: changedInputs,
      });
      if (!result.success) return;

      setChangedInputs({});
      setIsLock(true);
      return;
    }

    setIsLock(false);
  };

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

  const onInputChange: InputChangeProps = (e, transformedValue) => {
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

  const onOpenDeleteModal = () => {
    const props: DeleteModalProps = {
      stockId,
      type: 'purchase',
      purchasedId,
    };

    dispatch(
      openStockModal({
        modalName: 'DeleteStockModal',
        props,
      }),
    );
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
      <TableCell className='stock-name'>{mainInfo.stockName}</TableCell>
      <TableCell align='center'>{purchasedId}</TableCell>
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
          />
          <Input
            className='date'
            name='purchasedTime'
            onChange={onInputChange}
            disabled={isLock}
            type='time'
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
      />
      <InputCell
        name='purchasedPrice'
        onChange={onInputChange}
        onBlur={onInputChange}
        value={purchasedItem.purchasedPrice}
        disabled={isLock}
      />
      <NumberCell value={totalPurchasePrice} className='total-purchase' />
      <NumberCell value={mainInfo.currentPrice} />
      <NumberCell value={evaluationPrice} />
      <TableCell align='right'>{formattedEvaluationProfit}</TableCell>
      <TableCell align='right'>{formattedProfitRate}</TableCell>
      {isMainGroupSelected ? (
        <>
          <EditButton
            isLock={isLock}
            onClick={toggleLock}
            disabled={!isMainGroupSelected}
          />
          <DeleteButton
            onClick={onOpenDeleteModal}
            disabled={!isMainGroupSelected}
          />
        </>
      ) : null}
    </StyledPurchasedStockRow>
  );
};

export default PurchasedStock;

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
