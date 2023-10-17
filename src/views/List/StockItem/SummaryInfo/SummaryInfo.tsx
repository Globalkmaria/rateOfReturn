import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { BorderButton } from '../../../../components/Button';
import { BaseInput, Input } from '../../../../components/Input';
import { TableCell, TableRow } from '../../../../components/Table';
import { selectStockInfoById } from '../../../../features/stockList/selectors';
import {
  NumberCell,
  DeleteButton,
  CheckboxCell,
  EditButton,
} from '../components';
import { selectStockCheckedInfo } from '../../../../features/checkedItems/selectors';
import { selectIsMainGroupSelected } from '../../../../features/groups/selectors';
import {
  useChangeStockCheckbox,
  useGetStockSummaryData,
  useStockSummaryInputChange,
} from './hooks';
import { selectIsLoggedIn } from '../../../../features/user/selectors';
import userStocksService from '../../../../service/userStocks/userStocks';
import useModal from '../../hooks/useModal';
import { DeleteStockModal } from '../DeleteStockModal';

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
  const [isLock, setIsLock] = useState(true);
  const { showModal, onOpenModal, onCloseModal } = useModal();
  const isLoggedIn = useSelector(selectIsLoggedIn());
  const { changedInputs, initChangedInputs, onInputChange } =
    useStockSummaryInputChange(stockId);
  const onChangeCheckbox = useChangeStockCheckbox(stockId);

  const toggleLock = async () => {
    if (!isLoggedIn) {
      return setIsLock((prev) => !prev);
    }
    if (!isLock) {
      if (Object.keys(changedInputs).length === 0) return setIsLock(true);

      const result = await userStocksService.editUserStock({
        stockId,
        data: changedInputs,
      });
      if (!result.success) return;

      initChangedInputs();
      setIsLock(true);
      return;
    }

    setIsLock(false);
  };

  const checkedInfo = useSelector(selectStockCheckedInfo(stockId));
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const summaryData = useGetStockSummaryData(stockId);
  const formattedCurrentPrice = stockInfo.mainInfo.currentPrice.toString();

  useEffect(() => {
    setIsLock(true);
  }, [isMainGroupSelected]);

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
      <TableCell>
        <Input
          className='stockName'
          fullWidth
          onChange={onInputChange}
          name='stockName'
          value={stockInfo.mainInfo.stockName}
          disabled={isLock}
        />
      </TableCell>
      <TableCell align='center' colSpan={2} className='stock-summary'>
        Summary
      </TableCell>
      <NumberCell value={summaryData.purchaseQuantitySum} />
      <NumberCell value={summaryData.purchasePriceAverage} />
      <NumberCell
        className='total-purchase'
        value={summaryData.totalPurchasePrice}
      />
      <TableCell>
        <Input
          fullWidth
          name='currentPrice'
          onChange={onInputChange}
          onBlur={onInputChange}
          type='number'
          value={formattedCurrentPrice}
          disabled={isLock}
        />
      </TableCell>
      <NumberCell value={summaryData.evaluationPrice} />
      <TableCell align='right'>{summaryData.evaluationProfit}</TableCell>
      <TableCell align='right'>{summaryData.profitRate} </TableCell>

      {isMainGroupSelected ? (
        <>
          <EditButton
            isLock={isLock}
            onClick={toggleLock}
            disabled={!isMainGroupSelected}
          />
          <DeleteButton onClick={onOpenModal} disabled={!isMainGroupSelected} />
          {showModal && (
            <DeleteStockModal
              type='stock'
              stockId={stockId}
              purchasedId={''}
              onClose={onCloseModal}
            />
          )}
        </>
      ) : null}
    </StyledSummaryRow>
  );
};

export default SummaryInfo;

export const StyledSummaryRow = styled(TableRow)`
  background: ${({ theme }) => theme.colors.grey100};

  .stockName {
    font-weight: 700;
  }

  .total-purchase {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }

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
