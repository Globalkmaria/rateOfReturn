import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { TableCell } from '../../../../components/Table';
import { selectPurchasedItemsById } from '../../../../features/stockList/selectors';
import { NumberCell, StyledTextWrapper } from '../components';
import PurchasedInput from './PurchasedInput';
import { getPurchasedData } from './utils';
import {
  ChangedPurchasedItemInputs,
  SetChangedInputByFieldName,
} from './PurchasedStock';

type Props = {
  stockId: string;
  purchasedId: string;
  isLock: boolean;
  setChangedInputByFieldName: SetChangedInputByFieldName;
  changedInputs: ChangedPurchasedItemInputs;
};

const PurchasedContent = ({
  stockId,
  purchasedId,
  setChangedInputByFieldName,
  changedInputs,
  isLock,
}: Props) => {
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );
  const purchasedData = getPurchasedData({ purchasedItem, mainInfo });
  return (
    <>
      <StyledStockName>{mainInfo.stockName}</StyledStockName>
      <TableCell align='center' colSpan={1}>
        {purchasedId}
      </TableCell>
      <PurchasedInput
        setChangedInputByFieldName={setChangedInputByFieldName}
        changedInputs={changedInputs}
        purchasedItem={purchasedItem}
        isLock={isLock}
      />
      <StyledTotalPurchase withFixed value={purchasedData.totalPurchasePrice} />
      <NumberCell withFixed value={mainInfo.currentPrice} />
      <NumberCell withFixed value={purchasedData.evaluationPrice} />
      <NumberCell withFixed value={purchasedData.formattedEvaluationProfit} />
      <StyledProfitRate align='right'>
        <StyledTextWrapper>
          {purchasedData.formattedProfitRate}
        </StyledTextWrapper>
      </StyledProfitRate>
    </>
  );
};

export default memo(PurchasedContent);

const StyledStockName = styled(TableCell)`
  color: ${({ theme }) => theme.colors.subtitle};
`;

const StyledTotalPurchase = styled(NumberCell)`
  && {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }
`;

const StyledProfitRate = styled(TableCell)`
  white-space: nowrap;
`;
