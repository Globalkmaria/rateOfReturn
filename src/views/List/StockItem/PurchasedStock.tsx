import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '../../../components/Input';
import { TableCell, TableRow } from '../../../components/Table';
import { InputCell, NumberCell, LockButton, DeleteButton } from './components';
import { StockInfoData } from './StockItem';

interface PurchasedStockProps {
  purchasedStockData: StockInfoData;
}

const PurchasedStock: React.FC<PurchasedStockProps> = ({
  purchasedStockData,
}) => {
  const [isLock, setIsLock] = useState(true);
  const onLockButtonClick = () => setIsLock((prev) => !prev);
  const totalPurchasePrice =
    purchasedStockData.purchaseQuantity * purchasedStockData.purchasePrice;
  const evaluationPrice =
    purchasedStockData.purchaseQuantity * purchasedStockData.currentPrice;
  const evaluationProfit = evaluationPrice - totalPurchasePrice;
  const profitRate = (evaluationProfit / totalPurchasePrice) * 100;
  return (
    <StyledPurchasedStockRow>
      <TableCell></TableCell>
      <TableCell align='center'>{purchasedStockData.purchasedId}</TableCell>
      <TableCell>
        <Input
          disabled={isLock}
          type='date'
          value={purchasedStockData.purchaseDate}
        />
      </TableCell>
      <InputCell
        value={purchasedStockData.purchaseQuantity}
        disabled={isLock}
      />
      <InputCell value={purchasedStockData.purchasePrice} disabled={isLock} />
      <NumberCell value={totalPurchasePrice} />
      <InputCell value={purchasedStockData.currentPrice} disabled={isLock} />
      <NumberCell value={evaluationPrice} />
      <TableCell align='right'>{evaluationProfit.toLocaleString()}</TableCell>
      <TableCell align='right'>
        {profitRate.toFixed(2).toLocaleString()} %
      </TableCell>
      <TableCell>
        <LockButton isLock={isLock} onClick={onLockButtonClick} />
      </TableCell>
      <TableCell>
        <DeleteButton />
      </TableCell>
    </StyledPurchasedStockRow>
  );
};

export default PurchasedStock;

const StyledPurchasedStockRow = styled(TableRow)`
  &:hover {
    background: ${({ theme }) => theme.colors.yellow000};
  }
`;
