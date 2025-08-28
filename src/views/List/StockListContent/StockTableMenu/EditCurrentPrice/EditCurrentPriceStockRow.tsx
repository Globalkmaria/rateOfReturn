import { useRef } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { selectStockInfoById } from '@/features/stockList/selectors';

import { InputCell } from '@/views/List/StockItem/components';
import { PurchasedInputChangeProps } from '@/views/List/StockItem/PurchasedStock/PurchasedStock';
import { checkCurrentPrice } from '@/views/List/StockItem/validity';

import { TableCell, TableRow } from '@/components/table/Table';

import { CurrentPriceChanges } from './EditCurrentPriceModal';

interface ItemProps {
  stockId: string;
  changes: CurrentPriceChanges;
  onChange: PurchasedInputChangeProps;
  isError: boolean;
}

function EditCurrentPriceStockRow({
  stockId,
  onChange,
  changes,
  isError,
}: ItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mainInfo } = useSelector(selectStockInfoById(stockId));

  const value = changes[stockId] ?? mainInfo.currentPrice;
  const handleFocus = () => inputRef.current?.select();

  return (
    <StyledTableRow isError={isError}>
      <TableCell>{mainInfo.symbol}</TableCell>
      <TableCell>{mainInfo.stockName}</TableCell>
      <InputCell
        onFocus={handleFocus}
        ref={inputRef}
        name={stockId}
        value={value}
        align='right'
        onChange={onChange}
        validation={checkCurrentPrice}
        type='decimal'
      />
    </StyledTableRow>
  );
}

export default EditCurrentPriceStockRow;

const StyledTableRow = styled(TableRow)<{ isError: boolean }>`
  background: ${({ theme, isError }) =>
    isError ? theme.colors.red100 : theme.colors.white};

  &:hover {
    background: ${({ theme, isError }) =>
      isError ? theme.colors.red100 : theme.colors.grey100};
  }

  input {
    background: ${({ theme }) => theme.colors.grey200};

    &:focus {
      background: ${({ theme }) => theme.colors.grey200};
    }
  }
`;
