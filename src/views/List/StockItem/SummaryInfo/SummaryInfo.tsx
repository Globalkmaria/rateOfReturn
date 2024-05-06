import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import userStocksService from '../../../../service/userStocks/userStocks';

import { selectStockCheckedInfo } from '../../../../features/checkedItems/selectors';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import {
  updateStock,
  updateStockNeedInit,
} from '../../../../features/stockList/stockListSlice';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import { selectStockInfoById } from '../../../../features/stockList/selectors';

import { BorderButton } from '../../../../components/Button';
import { TableCell, TableRow } from '../../../../components/Table';
import { EditButton, MoreButton } from '@/components/IconButton';

import useModal from '../../hooks/useModal';
import { CheckboxCell } from '../components';
import { DeleteStockModal } from '../DeleteStockModal';
import { checkNoChange, getChangedStockData } from '../utils';
import { useStockSummaryInputChange } from './hooks/useStockSummaryInputChange';
import SummaryContent from './SummaryContent';
import useChangeStockCheckbox from './hooks/useChangeStockCheckbox';
import { getSoldInfoFromPurchasedInfo } from '@/features/solds/utils';
import { addNewSold } from '@/features/solds';
import getDateAndTime from '@/utils/getDateAndTime';
import { NewSold } from '@/repository/userSolds';
import userSoldsService from '@/service/userSolds/service';
import { DropboxItem } from '@/components/Dropbox/DropboxItem';

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
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { mainInfo, purchasedItems } = useSelector(
    selectStockInfoById(stockId),
  );

  const [isLock, setIsLock] = useState(!mainInfo.needInit);
  const { showModal, onOpenModal, onCloseModal } = useModal();
  const { changedInputs, initChangedInputs, onInputChange, onTagChange } =
    useStockSummaryInputChange(stockId);

  const onChangeCheckbox = useChangeStockCheckbox(stockId);

  const toggleLock = async () => {
    if (mainInfo.needInit) dispatch(updateStockNeedInit(stockId));
    if (isLock) return setIsLock(false);

    if (checkNoChange(changedInputs)) return setIsLock(true);

    if (isLoggedIn) {
      const result = await userStocksService.editUserStock({
        stockId,
        data: changedInputs,
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
      const soldItem = purchasedItems.allIds.map<NewSold>(purchasedId => ({
        ...purchasedItems.byId[purchasedId],
        stockId: mainInfo.stockId,
        stockName: mainInfo.stockName,
        soldPrice: mainInfo.currentPrice,
      }));
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

    for (const purchasedItem of purchasedItems.allIds) {
      const soldInfo = getSoldInfoFromPurchasedInfo(
        mainInfo,
        purchasedItems.byId[purchasedItem],
      );
      dispatch(addNewSold({ soldInfo, stockId: mainInfo.stockId }));
    }
  };

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
    <StyledSummaryRow>
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
                  Sold
                </DropboxItem>
                <DropboxItem onClick={onOpenModal}>Delete</DropboxItem>
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
        </>
      ) : (
        <TableCell />
      )}
    </StyledSummaryRow>
  );
};

export default memo(SummaryInfo);

export const StyledSummaryRow = styled(TableRow)`
  background: ${({ theme }) => theme.colors.grey100};
  height: 46px;

  ${BorderButton} {
    border: ${({ theme }) => `1px solid ${theme.colors.grey400}`};

    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey300};
    }
  }
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
