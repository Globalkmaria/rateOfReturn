import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';

import { TableCell } from '../../../../components/Table';
import { selectPurchasedItemsById } from '../../../../features/stockList/selectors';
import { NumberCell } from '../components';
import PurchasedInput from './PurchasedInput';
import { getPurchasedData } from './utils';
import { ChangedPurchasedItemInputs } from './PurchasedStock';

type Props = {
  stockId: string;
  purchasedId: string;
  isLock: boolean;
  setChangedInputs: Dispatch<SetStateAction<ChangedPurchasedItemInputs>>;
};

const PurchasedContent = ({ stockId, purchasedId, setChangedInputs, isLock }: Props) => {
  const { mainInfo, purchasedItem } = useSelector(selectPurchasedItemsById(stockId, purchasedId));
  const purchasedData = getPurchasedData({ purchasedItem, mainInfo });
  return (
    <>
      <StyledStockName>{mainInfo.stockName}</StyledStockName>
      <TableCell align='center' colSpan={1}>
        {purchasedId}
      </TableCell>
      <PurchasedInput
        stockId={stockId}
        purchasedId={purchasedId}
        setChangedInputs={setChangedInputs}
        purchasedItem={purchasedItem}
        isLock={isLock}
      />
      <StyledTotalPurchase value={purchasedData.totalPurchasePrice} />
      <NumberCell value={mainInfo.currentPrice} />
      <NumberCell value={purchasedData.evaluationPrice} />
      <TableCell align='right'>{purchasedData.formattedEvaluationProfit}</TableCell>
      <TableCell align='right'>{purchasedData.formattedProfitRate}</TableCell>
    </>
  );
};

export default PurchasedContent;

const StyledStockName = styled(TableCell)`
  color: ${({ theme }) => theme.colors.subtitle};
`;

const StyledTotalPurchase = styled(NumberCell)`
  && {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }
`;
