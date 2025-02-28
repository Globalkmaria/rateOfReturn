import { memo } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { selectIsStockListEditMode } from '@/features/temporalStockList/selectors';

import { TableCell } from '../../../../components/Table';
import { selectPurchasedItemsById } from '../../../../features/stockList/selectors';
import { NumberCell, ProfitRate } from '../components';
import PurchasedInput from './PurchasedInput';
import { getPurchasedData } from './utils';

type Props = {
  stockId: string;
  purchasedId: string;
};

const PurchasedContent = ({ stockId, purchasedId }: Props) => {
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );

  const isLock = useSelector(selectIsStockListEditMode);
  const purchasedData = getPurchasedData({ purchasedItem, mainInfo });
  return (
    <>
      <StyledStockName>{mainInfo.stockName}</StyledStockName>
      <TableCell align='center' colSpan={1}>
        {purchasedId}
      </TableCell>
      <PurchasedInput
        stockId={stockId}
        purchasedItem={purchasedItem}
        isLock={isLock}
      />
      <NumberCell withFixed value={purchasedData.totalPurchasePrice} />
      <NumberCell withFixed value={mainInfo.currentPrice} />
      <NumberCell withFixed value={purchasedData.evaluationPrice} />
      <NumberCell withFixed value={purchasedData.formattedEvaluationProfit} />
      <ProfitRate profitRate={purchasedData.formattedProfitRate} />
    </>
  );
};

export default memo(PurchasedContent);

const StyledStockName = styled(TableCell)`
  color: ${({ theme }) => theme.colors.subtitle};
`;
