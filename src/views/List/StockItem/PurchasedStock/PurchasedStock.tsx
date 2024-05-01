import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { updateCheckedItems } from '../../../../features/checkedItems/checkedItemsSlice';
import { selectIsPurchasedItemChecked } from '../../../../features/checkedItems/selectors';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupId,
} from '../../../../features/groups/selectors';
import { selectPurchasedItemsById } from '../../../../features/stockList/selectors';
import {
  updatePurchaseItem,
  updatePurchaseItemNeedInit,
} from '../../../../features/stockList/stockListSlice';
import { EditUserItemServiceData } from '../../../../service/userStocks/type';
import { selectIsLoggedIn } from '../../../../features/user/selectors';

import { TableCell, TableRow } from '../../../../components/Table';
import { BorderButton } from '../../../../components/Button';
import { TransformedValue } from '../../../../components/Input/BaseInput';
import userStocksService from '../../../../service/userStocks/userStocks';
import useModal from '../../hooks/useModal';
import { CheckboxCell } from '../components';
import { DeleteStockModal } from '../DeleteStockModal';
import PurchasedContent from './PurchasedContent';
import { getChangedPurchasedData } from './utils';
import { checkNoChange } from '../utils';
import IconButton, { EditButton, MoreButton } from '@/components/IconButton';
import { getSoldInfoFromPurchasedInfo } from '@/features/solds/utils';
import { addNewSold } from '@/features/solds';
import userSoldsService from '@/service/userSolds/service';
import getDateAndTime from '@/utils/getDateAndTime';
import { NewSold } from '@/repository/userSolds';
import { DropboxItem } from '@/components/Dropbox/DropboxItem';
import AddToGroupModal from './AddToGroupModal';
import { removePurchasedItemFromGroup } from '@/features/groups/groupsSlice';
import userGroupsService from '@/service/userGroups/userGroups';

export type SetChangedInputByFieldName = <
  T extends keyof ChangedPurchasedItemInputs,
>(
  fieldName: T,
  value: ChangedPurchasedItemInputs[T],
) => void;

export type PurchasedInputChangeProps = (
  e: ChangeEvent<HTMLInputElement>,
  transformedValue: TransformedValue | null,
) => void;

interface PurchasedStockProps {
  stockId: string;
  purchasedId: string;
}

export type ChangedPurchasedItemInputs = EditUserItemServiceData;

const PurchasedStock = ({ stockId, purchasedId }: PurchasedStockProps) => {
  const dispatch = useDispatch();

  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );
  const isPurchasedItemChecked = useSelector(
    selectIsPurchasedItemChecked(stockId, purchasedId),
  );
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const selectedGroupId = useSelector(selectSelectedGroupId);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [isLock, setIsLock] = useState(!purchasedItem.needInit);
  const [changedInputs, setChangedInputs] =
    useState<ChangedPurchasedItemInputs>({});
  const deleteModal = useModal();
  const groupModal = useModal();

  const setChangedInputByFieldName = useCallback<SetChangedInputByFieldName>(
    (fieldName, value) => {
      setChangedInputs(prev => ({ ...prev, [fieldName]: value }));
    },
    [],
  );

  const onChangeCheckbox = (value: boolean) =>
    dispatch(
      updateCheckedItems({
        type: 'purchased',
        checked: value,
        stockId,
        purchasedId,
      }),
    );

  const onToggleLock = async () => {
    if (purchasedItem.needInit)
      dispatch(updatePurchaseItemNeedInit({ stockId, purchasedId }));
    if (isLock) return setIsLock(false);

    if (checkNoChange(changedInputs)) return setIsLock(true);

    if (isLoggedIn) {
      const result = await userStocksService.editUserItem({
        stockId,
        itemId: purchasedId,
        data: changedInputs,
      });
      if (!result.success) return alert(result.message);
    }

    const purchasedData = getChangedPurchasedData(purchasedItem, changedInputs);
    dispatch(updatePurchaseItem({ stockId, purchasedId, purchasedData }));

    setChangedInputs({});
    setIsLock(true);
  };

  const onItemSold = async () => {
    if (isLoggedIn) {
      const { date, time } = getDateAndTime();
      const soldItem: NewSold = {
        ...purchasedItem,
        stockId: mainInfo.stockId,
        stockName: mainInfo.stockName,
        soldPrice: mainInfo.currentPrice,
      };
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

    const soldInfo = getSoldInfoFromPurchasedInfo(mainInfo, purchasedItem);
    dispatch(addNewSold({ soldInfo, stockId: mainInfo.stockId }));
  };

  const onRemoveItemFromGroup = async () => {
    if (isLoggedIn) {
      const result = await userGroupsService.deletePurchasedItemFromUserGroup({
        stockId,
        purchasedId,
        groupId: selectedGroupId,
      });

      if (!result.success) return;
    }
    dispatch(
      removePurchasedItemFromGroup({
        groupId: selectedGroupId,
        stockId,
        purchasedId,
      }),
    );
  };

  useEffect(() => {
    if (isMainGroupSelected && purchasedItem.needInit)
      setIsLock(!purchasedItem.needInit);
    else setIsLock(true);
  }, [isMainGroupSelected]);

  useEffect(() => {
    return () => {
      if (purchasedItem.needInit)
        dispatch(updatePurchaseItemNeedInit({ stockId, purchasedId }));
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
        changedInputs={changedInputs}
        isLock={isLock}
        setChangedInputByFieldName={setChangedInputByFieldName}
      />
      {isMainGroupSelected ? (
        <>
          <TableCell>
            <StyledButtonGroup>
              <EditButton
                isLock={isLock}
                onClick={onToggleLock}
                disabled={!isMainGroupSelected}
              />
              <MoreButton width={80} vertical='bottom' horizontal='right'>
                <DropboxItem
                  onClick={onItemSold}
                  disabled={!isLock}
                  title='To sold list'
                >
                  Sold
                </DropboxItem>
                <DropboxItem
                  onClick={groupModal.onOpenModal}
                  title='Group actions'
                >
                  Group
                </DropboxItem>
                <DropboxItem
                  onClick={deleteModal.onOpenModal}
                  title='Delete item'
                >
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
        </>
      ) : (
        <>
          <TableCell>
            <RemoveFromGroupButton>
              <IconButton
                width={32}
                icon='remove'
                onClick={onRemoveItemFromGroup}
                title='Remove from group'
              />
            </RemoveFromGroupButton>
          </TableCell>
        </>
      )}
    </StyledPurchasedStock>
  );
};

export default memo(PurchasedStock);

const StyledPurchasedStock = styled(TableRow)`
  background: ${({ theme }) => theme.colors.white};
  height: 46px;

  &:hover {
    background: ${({ theme }) => theme.colors.indigo000};
  }

  ${BorderButton} {
    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey400};
    }
  }
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RemoveFromGroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
