import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import IconButton, { EditButton } from '@/components/IconButton';
import { TransformedValue } from '@/components/Input/BaseInput';
import { Input } from '@/components/Input/Input';
import { TableCell, TableRow } from '@/components/Table';
import { Sold } from '@/features/sold/type';
import {
  InputCell,
  NumberCell,
  StyledTextWrapper,
} from '@/views/List/StockItem/components';
import { checkSoldPriceValidity } from './util';
import useModal from '@/views/List/hooks/useModal';
import DeleteSoldModal from './DeleteSoldModal';
import { getLocalDateTime } from '@/utils';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSold, selectSoldItem, updateSold } from '@/features/sold';

type SoldItemInputs = Partial<
  Pick<Sold, 'soldTime' | 'soldDate' | 'soldPrice'>
>;

interface Props {
  purchasedId: string;
}

function SoldItem({ purchasedId }: Props) {
  const dispatch = useDispatch();
  const focusedInput = useRef<HTMLInputElement>(null);
  const [isLock, setIsLock] = useState(true);
  const [changedInputs, setChangedInputs] = useState<SoldItemInputs>({});
  const { showModal, onOpenModal, onCloseModal } = useModal();

  const item = useSelector(selectSoldItem(purchasedId));

  const buyTotalCost = item.purchasedQuantity * item.purchasedPrice;
  const soldTotalValue = item.purchasedQuantity * item.soldPrice;
  const returnOfInvestment = soldTotalValue - buyTotalCost;
  const returnOfInvestmentRatio = `${((returnOfInvestment / buyTotalCost) * 100)
    .toFixed(2)
    .toLocaleString()} %`;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangedInputs({ ...changedInputs, [name]: value });
  };

  const onToggleLock = async () => {
    // TODO api
    if (isLock) {
      setIsLock(false);
      return;
    }

    if (Object.keys(changedInputs).length === 0) {
      setIsLock(true);
      return;
    }

    const newItem: Sold = {
      ...item,
      ...changedInputs,
    };
    dispatch(updateSold(newItem));

    setIsLock(true);
  };

  const onDelete = async () => {
    // TODO api
    dispatch(deleteSold(item.purchasedId));
    onCloseModal();
  };

  const onSoldPriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    transformedValue: TransformedValue | null,
  ) => {
    if (transformedValue === null) return;
    const value = transformedValue[1];

    const validity = checkSoldPriceValidity(value);
    if (!validity.isValid) return alert(validity.message);

    setChangedInputs({ ...changedInputs, [e.target.name]: value });
  };

  const { localDate, localTime } = getLocalDateTime(
    item.soldDate,
    item.soldTime,
  );

  useEffect(() => {
    if (!focusedInput.current?.disabled) focusedInput.current?.focus();
  }, [isLock]);

  return (
    <StyledContainer>
      <TableCell align='center'>{item.purchasedId}</TableCell>
      <TableCell>
        <StyledTextWrapper>{item.stockName}</StyledTextWrapper>
      </TableCell>
      <NumberCell value={item.purchasedQuantity} />
      <TableCell>
        <StyledTextWrapper>
          {localDate} {localTime}
        </StyledTextWrapper>
      </TableCell>
      <NumberCell withFixed value={item.purchasedPrice} />
      <NumberCell withFixed value={buyTotalCost} />
      <TableCell>
        <StyledDateTime>
          <Input
            name='soldDate'
            onChange={onInputChange}
            disabled={isLock}
            type='date'
            value={changedInputs.soldDate || item.soldDate}
            fullWidth
            aria-label='sold date'
            ref={focusedInput}
          />
          <Input
            name='soldTime'
            onChange={onInputChange}
            disabled={isLock}
            type='time'
            aria-label='sold time'
            value={changedInputs.soldTime || item.soldTime}
            fullWidth
          />
        </StyledDateTime>
      </TableCell>
      <InputCell
        withFixed
        name='soldPrice'
        onChange={onSoldPriceChange}
        value={changedInputs.soldPrice || item.soldPrice}
        disabled={isLock}
        aria-label='sold Price'
      />
      <NumberCell withFixed value={soldTotalValue} />
      <NumberCell withFixed value={returnOfInvestment} />
      <StyledSoldRor align='right'>
        <StyledTextWrapper>{returnOfInvestmentRatio}</StyledTextWrapper>
      </StyledSoldRor>
      <TableCell>
        <StyledButtonGroup>
          <EditButton isLock={isLock} onClick={onToggleLock} />
          <IconButton icon='delete' onClick={onOpenModal} />
        </StyledButtonGroup>
      </TableCell>
      {showModal && (
        <DeleteSoldModal onDelete={onDelete} onClose={onCloseModal} />
      )}
    </StyledContainer>
  );
}

export default SoldItem;

const StyledContainer = styled(TableRow)`
  background: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }

  input:not([disabled]) {
    background: ${({ theme }) => theme.colors.grey300};
  }
`;

const StyledDateTime = styled.div`
  display: flex;
  gap: 5px;
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSoldRor = styled(TableCell)`
  white-space: nowrap;
`;