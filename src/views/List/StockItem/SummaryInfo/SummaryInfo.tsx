import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import userSoldsService from '@/service/userSolds/service';
import userStocksService from '@/service/userStocks/userStocks';

import { generateSoldListWithStockInfo } from '@/features/solds/utils';
import { addNewSoldList } from '@/features/solds';
import { selectStockCheckedInfo } from '@/features/checkedItems/selectors';
import {
  updateStock,
  updateStockNeedInit,
} from '@/features/stockList/stockListSlice';
import { selectIsLoggedIn } from '@/features/user/selectors';
import { selectStockInfoById } from '@/features/stockList/selectors';

import { TableCell, TableRow } from '@/components/Table';
import { EditButton, MoreButton } from '@/components/IconButton';
import { DropboxItem } from '@/components/Dropbox/DropboxItem';
import Icon from '@/components/Icon';

import getDateAndTime from '@/utils/getDateAndTime';

import AddNote from '@/views/Note/NoteInfo/modals/AddNote';
import { INITIAL_NOTE_FORM_STATE } from '@/views/Note/NoteInfo/const';
import { NoteFormState } from '@/views/Note/NoteInfo/type';

import useModal from '../../hooks/useModal';
import { CheckboxCell } from '../components';
import { DeleteStockModal } from '../DeleteStockModal';
import {
  checkNoChange,
  getChangedStockData,
  getEditUserStockData,
} from '../utils';
import { useStockSummaryInputChange } from './hooks/useStockSummaryInputChange';
import SummaryContent from './SummaryContent';
import useChangeStockCheckbox from './hooks/useChangeStockCheckbox';
import { generateSoldItems } from './utils';
import { useAddItem } from '../hooks/useAddItem';
import useIsMainGroup from '../../hooks/useIsMainGroup';

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

  const [isLock, setIsLock] = useState(!mainInfo.needInit);
  const { showModal, onOpenModal, onCloseModal } = useModal();
  const { changedInputs, initChangedInputs, onInputChange, onTagChange } =
    useStockSummaryInputChange(stockId);

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

  const toggleLock = async () => {
    if (mainInfo.needInit) dispatch(updateStockNeedInit(stockId));
    if (isLock) return setIsLock(false);

    if (checkNoChange(changedInputs)) return setIsLock(true);

    if (isLoggedIn) {
      const result = await userStocksService.editUserStock({
        stockId,
        data: getEditUserStockData(changedInputs, mainInfo),
      });

      if (!result.success) return alert(result.message);
    }

    dispatch(
      updateStock({
        stockId: stockId,
        stockData: getChangedStockData(changedInputs, mainInfo),
      }),
    );
    initChangedInputs();
    setIsLock(true);
  };

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

  useEffect(() => {
    if (isMainGroupSelected && mainInfo.needInit) setIsLock(!mainInfo.needInit);
    else setIsLock(true);
  }, [isMainGroupSelected]);

  useEffect(() => {
    return () => {
      if (mainInfo.needInit) dispatch(updateStockNeedInit(stockId));
    };
  }, []);

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
      <SummaryContent
        stockId={stockId}
        isLock={isLock}
        onInputChange={onInputChange}
        changedInputs={changedInputs}
        onTagChange={onTagChange}
      />
      {isMainGroupSelected ? (
        <>
          <TableCell>
            <StyledButtonGroup>
              <EditButton
                isLock={isLock}
                onClick={toggleLock}
                disabled={!isMainGroupSelected}
              />
              <MoreButton width={100} vertical='bottom' horizontal='right'>
                <DropboxItem onClick={onStockSold} disabled={!isLock}>
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
