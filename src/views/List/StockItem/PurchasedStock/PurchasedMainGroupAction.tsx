import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import userSoldsService from '@/service/userSolds/service';

import getDateAndTime from '@/utils/getDateAndTime';

import {
  addNewSold,
  generateSoldInfoFromPurchasedInfo,
} from '@/features/solds';
import { selectPurchasedItemsById } from '@/features/stockList/selectors';
import { selectIsStockListEditMode } from '@/features/temporalStockList/selectors';
import { selectIsLoggedIn } from '@/features/user/selectors';

import { INITIAL_NOTE_FORM_STATE } from '@/views/Note/NoteInfo/const';
import AddNote from '@/views/Note/NoteInfo/modals/AddNote';
import { NoteFormState } from '@/views/Note/NoteInfo/type';

import { DropboxItem } from '@/components/Dropbox/DropboxItem';
import Icon from '@/components/Icon';
import { MoreButton } from '@/components/IconButton';
import { TableCell } from '@/components/table/Table';

import { NewSold } from '@/repository/userSolds';

import AddToGroupModal from './AddToGroupModal';
import useModal from '../../hooks/useModal';
import { DeleteStockModal } from '../DeleteStockModal';
import { generateSoldItem } from '../SummaryInfo/utils';

interface Props {
  stockId: string;
  purchasedId: string;
}
function PurchasedMainGroupAction({ stockId, purchasedId }: Props) {
  const isEditMode = useSelector(selectIsStockListEditMode);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );

  const deleteModal = useModal();
  const groupModal = useModal();

  const noteModal = useModal();
  const addNoteInitialFormState: NoteFormState = {
    ...INITIAL_NOTE_FORM_STATE,
    stockName: {
      value: mainInfo.stockId,
      label: mainInfo.stockName,
    },
    purchasedId: purchasedId,
    tag: mainInfo.tag ?? null,
  };

  const onItemSold = async () => {
    if (isLoggedIn) {
      const { date, time } = getDateAndTime();
      const soldItem: NewSold = generateSoldItem(mainInfo, purchasedItem);
      const result = await userSoldsService.addNewSolds({
        date,
        time,
        solds: [soldItem],
      });

      if (!result.success) {
        alert(result.message);
        return;
      }
    }
    const soldInfo = generateSoldInfoFromPurchasedInfo(mainInfo, purchasedItem);
    dispatch(addNewSold({ soldInfo, stockId: mainInfo.stockId }));
  };

  return (
    <>
      <TableCell>
        <StyledButtonGroup>
          <MoreButton width={80} vertical={'bottom'} horizontal='right'>
            <DropboxItem
              onClick={onItemSold}
              disabled={isEditMode}
              title='To sold list'
            >
              <Icon icon='sold' />
              Sold
            </DropboxItem>
            <DropboxItem onClick={groupModal.onOpenModal} title='Group actions'>
              <Icon icon='folder' />
              Group
            </DropboxItem>
            <DropboxItem
              onClick={noteModal.onOpenModal}
              title='Write stock note'
            >
              <Icon icon='note' />
              Write stock note
            </DropboxItem>
            <DropboxItem
              onClick={deleteModal.onOpenModal}
              title='Delete this item'
            >
              <Icon icon='delete' />
              Delete
            </DropboxItem>
          </MoreButton>
        </StyledButtonGroup>
      </TableCell>
      {groupModal.showModal && (
        <AddToGroupModal
          stockId={stockId}
          purchasedId={purchasedId}
          onClose={groupModal.onCloseModal}
        />
      )}
      {deleteModal.showModal && (
        <DeleteStockModal
          type='purchase'
          stockId={stockId}
          purchasedId={purchasedId}
          onClose={deleteModal.onCloseModal}
        />
      )}
      {noteModal.showModal && (
        <AddNote
          initialFormState={addNoteInitialFormState}
          onCloseModal={noteModal.onCloseModal}
        />
      )}
    </>
  );
}

export default PurchasedMainGroupAction;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  .drop-container {
    z-index: 9;
  }
`;
