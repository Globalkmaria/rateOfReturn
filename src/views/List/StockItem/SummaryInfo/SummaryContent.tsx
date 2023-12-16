import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { TableCell } from '../../../../components/Table';
import { Input } from '../../../../components/Input/Input';
import { TransformedValue } from '../../../../components/Input/BaseInput';
import { selectStockInfoById } from '../../../../features/stockList/selectors';
import { NumberCell } from '../components';
import { useGetStockSummaryData } from './hooks/useGetStockSummaryData';

type Props = {
  stockId: string;
  isLock: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, transformedValue: TransformedValue) => void;
};

const SummaryContent = ({ stockId, isLock, onInputChange }: Props) => {
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const summaryData = useGetStockSummaryData(stockId);

  const formattedCurrentPrice = stockInfo.mainInfo.currentPrice.toString();
  return (
    <>
      <TableCell>
        <StyledStockName
          aria-label='stock name'
          fullWidth
          onChange={onInputChange}
          name='stockName'
          value={stockInfo.mainInfo.stockName}
          disabled={isLock}
        />
      </TableCell>
      <TableCell align='center' colSpan={2}>
        Summary
      </TableCell>
      <NumberCell value={summaryData.purchaseQuantitySum} />
      <NumberCell value={summaryData.purchasePriceAverage} />
      <StyledTotalPurchase value={summaryData.totalPurchasePrice} />
      <TableCell>
        <Input
          fullWidth
          aria-label='current price'
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
    </>
  );
};

export default SummaryContent;

const StyledStockName = styled(Input)`
  font-weight: 700;
`;

const StyledTotalPurchase = styled(NumberCell)`
  && {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }
`;
