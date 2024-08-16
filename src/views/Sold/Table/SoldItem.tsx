import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import userSoldsService from '@/service/userSolds/service';

import { EditButton, MoreButton } from '@/components/IconButton';
import { TransformedValue } from '@/components/Input/BaseInput';
import { Input } from '@/components/Input/Input';
import { TableCell, TableRow } from '@/components/Table';
import { StyledChip, StyledChipText } from '@/components/Tag';
import { StyledIconButton } from '@/components/IconButton/IconButton';
import { DropboxItem } from '@/components/Dropbox/DropboxItem';
import Icon from '@/components/Icon';

import { Sold } from '@/features/solds/type';
import { selectIsLoggedIn } from '@/features/user/selectors';
import { deleteSold, selectSoldItem, updateSold } from '@/features/solds';

import { getLocalDateTime } from '@/utils';
import {
  getFixedLocaleString,
  getPercentage,
  localStringToNumber,
} from '@/utils/number';

import {
  InputCell,
  NumberCell,
  StyledTextWrapper,
} from '@/views/List/StockItem/components';
import useModal from '@/views/List/hooks/useModal';
import AddNote from '@/views/Note/NoteInfo/modals/AddNote';
import { NoteFormState } from '@/views/Note/NoteInfo/type';
import { INITIAL_NOTE_FORM_STATE } from '@/views/Note/NoteInfo/const';

import DeleteSoldModal from './DeleteSoldModal';
import { checkSoldPrice } from './utils';

export type SoldItemInputs = Partial<
  Pick<Sold, 'soldTime' | 'soldDate' | 'soldPrice'>
>;

interface Props {
  id: string;
}

function SoldItem({ id }: Props) {
  const dispatch = useDispatch();
  const focusedInput = useRef<HTMLInputElement>(null);
  const [isLock, setIsLock] = useState(true);
  const [changedInputs, setChangedInputs] = useState<SoldItemInputs>({});
  const deleteModal = useModal();
  const noteModal = useModal();

  const item = useSelector(selectSoldItem(id));
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const addNoteInitialFormState: NoteFormState = {
    ...INITIAL_NOTE_FORM_STATE,
    soldId: id,
    stockName: {
      value: item.stockId,
      label: item.stockName,
    },
    purchasedId: item.purchasedId,
    tag: item.tag ?? null,
  };

  const buyTotalCost = item.purchasedQuantity * item.purchasedPrice;
  const soldTotalValue =
    item.purchasedQuantity * localStringToNumber(item.soldPrice);
  const returnOfInvestment = soldTotalValue - buyTotalCost;
  const returnOfInvestmentRatio = `${getPercentage(
    returnOfInvestment,
    buyTotalCost,
  )
    .toFixed(2)
    .toLocaleString()} %`;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangedInputs({ ...changedInputs, [name]: value });
  };

  const onToggleLock = async () => {
    if (isLock) {
      setIsLock(false);
      return;
    }

    if (Object.keys(changedInputs).length === 0) {
      setIsLock(true);
      return;
    }

    if (isLoggedIn) {
      const result = await userSoldsService.editSold({
        id: id,
        data: changedInputs,
      });

      if (!result.success) {
        alert(result.message);
        return;
      }
    }

    const newItem: Sold = {
      ...item,
      ...changedInputs,
      soldPrice: getFixedLocaleString(changedInputs.soldPrice || 0),
    };

    dispatch(updateSold(newItem));
    setChangedInputs({});

    setIsLock(true);
  };

  const onDelete = async () => {
    if (isLoggedIn) {
      const result = await userSoldsService.deleteSold(item.id);

      if (!result.success) {
        alert(result.message);
        return;
      }
    }

    dispatch(deleteSold(item.id));
    deleteModal.onCloseModal();
  };

  const onSoldPriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    transformedValue: TransformedValue | null,
  ) => {
    if (transformedValue === null) return;
    const value = transformedValue[0];

    setChangedInputs({ ...changedInputs, [e.target.name]: value });
  };

  const { localDate, localTime } = getLocalDateTime(
    item.purchasedDate,
    item.purchasedTime,
  );

  useEffect(() => {
    if (!focusedInput.current?.disabled) focusedInput.current?.focus();
  }, [isLock]);

  return (
    <StyledContainer>
      <TableCell align='center'>{item.id}</TableCell>
      <TableCell>
        <StyledTextWrapper>{item.stockName}</StyledTextWrapper>
      </TableCell>
      <TableCell>
        {item.tag && (
          <StyledChip>
            <StyledChipText width={180}>{item.tag}</StyledChipText>
          </StyledChip>
        )}
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
            value={changedInputs.soldDate ?? item.soldDate}
            aria-label='sold date'
            ref={focusedInput}
          />
          <Input
            name='soldTime'
            onChange={onInputChange}
            disabled={isLock}
            type='time'
            aria-label='sold time'
            value={changedInputs.soldTime ?? item.soldTime}
          />
        </StyledDateTime>
      </TableCell>
      <InputCell
        withFixed
        type='decimal'
        name='soldPrice'
        onChange={onSoldPriceChange}
        value={changedInputs.soldPrice ?? item.soldPrice}
        disabled={isLock}
        aria-label='sold Price'
        validation={checkSoldPrice}
      />
      <NumberCell withFixed value={soldTotalValue} />
      <NumberCell withFixed value={returnOfInvestment} />
      <StyledSoldRor align='right'>
        <StyledTextWrapper>{returnOfInvestmentRatio}</StyledTextWrapper>
      </StyledSoldRor>
      <TableCell>
        <StyledButtonGroup>
          <EditButton isLock={isLock} onClick={onToggleLock} />
          <MoreButton width={100} vertical='bottom' horizontal='right'>
            <DropboxItem
              onClick={noteModal.onOpenModal}
              title='Write stock note'
            >
              <Icon icon='note' />
              Write stock note
            </DropboxItem>
            <DropboxItem onClick={deleteModal.onOpenModal}>
              <Icon icon='delete' />
              Delete
            </DropboxItem>
          </MoreButton>
        </StyledButtonGroup>
      </TableCell>
      {deleteModal.showModal && (
        <DeleteSoldModal
          onDelete={onDelete}
          onClose={deleteModal.onCloseModal}
        />
      )}
      {noteModal.showModal && (
        <AddNote
          initialFormState={addNoteInitialFormState}
          onCloseModal={noteModal.onCloseModal}
        />
      )}
    </StyledContainer>
  );
}

export default SoldItem;

const StyledContainer = styled(TableRow)`
  background: ${({ theme }) => theme.colors.white};

  &:hover ${TableCell} {
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

  ${StyledIconButton} {
    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey300};
    }
  }
`;

const StyledSoldRor = styled(TableCell)`
  white-space: nowrap;
`;
