import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import userSoldsService from '@/service/userSolds/service';

import getDateAndTime from '@/utils/getDateAndTime';

import { selectStockCheckedInfo } from '@/features/checkedItems/selectors';
import { addNewSoldList } from '@/features/solds';
import { generateSoldListWithStockInfo } from '@/features/solds/utils';
import { selectStockInfoById } from '@/features/stockList/selectors';
import { selectIsStockListEditMode } from '@/features/temporalStockList/selectors';
import { selectIsLoggedIn } from '@/features/user/selectors';

import { INITIAL_NOTE_FORM_STATE } from '@/views/Note/NoteInfo/const';
import AddNote from '@/views/Note/NoteInfo/modals/AddNote';
import { NoteFormState } from '@/views/Note/NoteInfo/type';

import { DropboxItem } from '@/components/Dropbox/DropboxItem';
import Icon from '@/components/Icon';
import { MoreButton } from '@/components/IconButton';
import { TableCell, TableRow } from '@/components/table/Table';

import { CheckboxCell } from '../components';
import useChangeStockCheckbox from './hooks/useChangeStockCheckbox';
import SummaryContent from './SummaryContent';
import useModal from '../../hooks/useModal';
import { DeleteStockModal } from '../DeleteStockModal';
import { generateSoldItems } from './utils';
import useIsMainGroup from '../../hooks/useIsMainGroup';
import { useAddItem } from '../hooks/useAddItem';

export type SummaryInfoData = {
  purchaseQuantitySum: number;
  purchasePriceAverage: number;
  totalPurchasePrice: number;
  evaluationPrice: number;
  evaluationProfit: number;
  profitRate: number;
};

export interface SummaryInfoProps {
  stockId: string;
}

const SummaryInfo = ({ stockId }: SummaryInfoProps) => {
  const dispatch = useDispatch();
  const checkedInfo = useSelector(selectStockCheckedInfo(stockId));
  const isMainGroupSelected = useIsMainGroup();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { mainInfo, purchasedItems } = useSelector(
    selectStockInfoById(stockId),
  );

  const isEditMode = useSelector(selectIsStockListEditMode);
  const { showModal, onOpenModal, onCloseModal } = useModal();

  const { showModalNote, onCloseModalNote, onOpenModalNote } = useModal('note');
  const addNoteInitialFormState: NoteFormState = {
    ...INITIAL_NOTE_FORM_STATE,
    stockName: {
      value: mainInfo.stockId,
      label: mainInfo.stockName,
    },
    tag: mainInfo.tag ?? null,
  };

  const onChangeCheckbox = useChangeStockCheckbox(stockId);

  const onStockSold = async () => {
    if (isLoggedIn) {
      const { date, time } = getDateAndTime();
      const soldItem = generateSoldItems(mainInfo, purchasedItems);
      const result = await userSoldsService.addNewSolds({
        date,
        time,
        solds: soldItem,
      });

      if (!result.success) {
        alert(result.message);
        return;
      }
    }

    const soldList = generateSoldListWithStockInfo(mainInfo, purchasedItems);
    dispatch(addNewSoldList({ soldList, stockId: mainInfo.stockId }));
  };

  const onAddItem = useAddItem(stockId);

  return (
    <StyledSummaryRow data-testid='current__stock-summary'>
      {isMainGroupSelected ? (
        <CheckboxCell
          disabled={!isMainGroupSelected}
          onClick={onChangeCheckbox}
          value={checkedInfo.allChecked}
          title='Check all group items'
        />
      ) : null}
      <SummaryContent stockId={stockId} />
      {isMainGroupSelected ? (
        <>
          <TableCell>
            <StyledButtonGroup>
              <MoreButton width={100} vertical='bottom' horizontal='right'>
                <DropboxItem onClick={onStockSold} disabled={isEditMode}>
                  <Icon icon='sold' /> Sold
                </DropboxItem>
                <DropboxItem onClick={onAddItem} title='Add same stock'>
                  <Icon icon='add' />
                  Add same stock
                </DropboxItem>
                <DropboxItem onClick={onOpenModalNote} title='Write stock note'>
                  <Icon icon='note' />
                  Write stock note
                </DropboxItem>
                <DropboxItem onClick={onOpenModal}>
                  <Icon icon='delete' />
                  Delete
                </DropboxItem>
              </MoreButton>
            </StyledButtonGroup>
          </TableCell>
          {showModal && (
            <DeleteStockModal
              type='stock'
              stockId={stockId}
              purchasedId={''}
              onClose={onCloseModal}
            />
          )}
          {showModalNote && (
            <AddNote
              initialFormState={addNoteInitialFormState}
              onCloseModal={onCloseModalNote}
            />
          )}
        </>
      ) : (
        <TableCell />
      )}
    </StyledSummaryRow>
  );
};

export default memo(SummaryInfo);

export const StyledSummaryRow = styled(TableRow)`
  height: 46px;
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  .drop-container {
    z-index: 9;
  }
`;
