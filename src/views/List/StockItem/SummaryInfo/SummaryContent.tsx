import { useSelector } from 'react-redux';

import { TableCell } from '../../../../components/Table';
import { Input, TransformedValue } from '../../../../components/Input';
import { NumberCell } from '../components';
import { selectStockInfoById } from '../../../../features/stockList/selectors';
import { useGetStockSummaryData } from './useGetStockSummaryData';

type Props = {
  stockId: string;
  isLock: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    transformedValue: TransformedValue,
  ) => void;
};

const SummaryContent = ({ stockId, isLock, onInputChange }: Props) => {
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const summaryData = useGetStockSummaryData(stockId);

  const formattedCurrentPrice = stockInfo.mainInfo.currentPrice.toString();
  return (
    <>
      <TableCell>
        <Input
          aria-label='stock name'
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
          aria-label='current price'
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
    </>
  );
};

export default SummaryContent;
