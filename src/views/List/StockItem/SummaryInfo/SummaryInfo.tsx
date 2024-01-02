import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import userStocksService from '../../../../service/userStocks/userStocks';

import { selectStockCheckedInfo } from '../../../../features/checkedItems/selectors';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import { updateStock, updateStockNeedInit } from '../../../../features/stockList/stockListSlice';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import { selectStockInfoById } from '../../../../features/stockList/selectors';

import { BorderButton } from '../../../../components/Button';
import { BaseInput } from '../../../../components/Input/BaseInput';
import { TableCell, TableRow } from '../../../../components/Table';

import useModal from '../../hooks/useModal';
import { DeleteButton, CheckboxCell } from '../components';
import { DeleteStockModal } from '../DeleteStockModal';
import EditButton from '../EditButton';
import { checkNoChange, getChangedStockData } from '../utils';
import { useStockSummaryInputChange } from './hooks/useStockSummaryInputChange';
import SummaryContent from './SummaryContent';
import useChangeStockCheckbox from './hooks/useChangeStockCheckbox';

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
  const { mainInfo } = useSelector(selectStockInfoById(stockId));

  const [isLock, setIsLock] = useState(!mainInfo.needInit);
  const { showModal, onOpenModal, onCloseModal } = useModal();
  const { changedInputs, initChangedInputs, onInputChange } = useStockSummaryInputChange(stockId);

  const onChangeCheckbox = useChangeStockCheckbox(stockId);

  const toggleLock = async () => {
    if (mainInfo.needInit) dispatch(updateStockNeedInit(stockId));
    if (isLock) return setIsLock(false);

    if (checkNoChange(changedInputs)) return setIsLock(true);

    if (isLoggedIn) {
      const result = await userStocksService.editUserStock({ stockId, data: changedInputs });
      if (!result.success) return alert(result.message);
    }

    dispatch(updateStock({ stockId: stockId, stockData: getChangedStockData(changedInputs, mainInfo) }));
    initChangedInputs();
    setIsLock(true);
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
      <SummaryContent stockId={stockId} isLock={isLock} onInputChange={onInputChange} changedInputs={changedInputs} />
      {isMainGroupSelected ? (
        <>
          <EditButton isLock={isLock} onClick={toggleLock} disabled={!isMainGroupSelected} />
          <DeleteButton onClick={onOpenModal} disabled={!isMainGroupSelected} />
          {showModal && <DeleteStockModal type='stock' stockId={stockId} purchasedId={''} onClose={onCloseModal} />}
        </>
      ) : null}
    </StyledSummaryRow>
  );
};

export default memo(SummaryInfo);

export const StyledSummaryRow = styled(TableRow)`
  background: ${({ theme }) => theme.colors.grey100};

  ${TableCell} > ${BaseInput} {
    background: ${({ theme }) => theme.colors.grey300};
  }

  ${BorderButton} {
    border: ${({ theme }) => `1px solid ${theme.colors.grey400}`};

    &:not([disabled]):hover {
      background: ${({ theme }) => theme.colors.grey300};
    }
  }
`;
