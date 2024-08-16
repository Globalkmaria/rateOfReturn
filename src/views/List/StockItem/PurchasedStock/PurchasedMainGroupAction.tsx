import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { TableCell } from '@/components/Table';
import useModal from '../../hooks/useModal';
import { EditButton, MoreButton } from '@/components/IconButton';
import { DropboxItem } from '@/components/Dropbox/DropboxItem';
import AddToGroupModal from './AddToGroupModal';
import { DeleteStockModal } from '../DeleteStockModal';
import userSoldsService from '@/service/userSolds/service';
import getDateAndTime from '@/utils/getDateAndTime';
import { NewSold } from '@/repository/userSolds';
import { selectIsLoggedIn } from '@/features/user/selectors';
import { selectPurchasedItemsById } from '@/features/stockList/selectors';
import {
  addNewSold,
  generateSoldInfoFromPurchasedInfo,
} from '@/features/solds';
import { generateSoldItem } from '../SummaryInfo/utils';
import Icon from '@/components/Icon';
import useIsMainGroup from '../../hooks/useIsMainGroup';
import { NoteFormState } from '@/views/Note/NoteInfo/type';
import AddNote from '@/views/Note/NoteInfo/modals/AddNote';
import { INITIAL_NOTE_FORM_STATE } from '@/views/Note/NoteInfo/const';

interface Props {
  stockId: string;
  purchasedId: string;
  isLock: boolean;
  isLastIdx: boolean;
  onToggleLock: () => void;
}
function PurchasedMainGroupAction({
  stockId,
  purchasedId,
  isLock,
  onToggleLock,
  isLastIdx,
}: Props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMainGroupSelected = useIsMainGroup();
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );

  const deleteModal = useModal();
  const groupModal = useModal();

  const moreDropdownDirection = isLastIdx ? 'top' : 'bottom';

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
          <EditButton
            isLock={isLock}
            onClick={onToggleLock}
            disabled={!isMainGroupSelected}
          />
          <MoreButton
            width={80}
            vertical={moreDropdownDirection}
            horizontal='right'
          >
            <DropboxItem
              onClick={onItemSold}
              disabled={!isLock}
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
