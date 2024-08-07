import { Dispatch, SetStateAction, memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { TableCell } from '../../../../components/Table';
import { selectPurchasedItemsById } from '../../../../features/stockList/selectors';
import { NumberCell, StyledTextWrapper } from '../components';
import PurchasedInput from './PurchasedInput';
import { getPurchasedData } from './utils';
import { EditUserItemServiceData } from '@/service/userStocks/type';

type Props = {
  stockId: string;
  purchasedId: string;
  isLock: boolean;
  setChangedInputs: Dispatch<SetStateAction<EditUserItemServiceData>>;
  changedInputs: EditUserItemServiceData;
};

const PurchasedContent = ({
  stockId,
  purchasedId,
  setChangedInputs,
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
        setChangedInputs={setChangedInputs}
        changedInputs={changedInputs}
        purchasedItem={purchasedItem}
        isLock={isLock}
      />
      <NumberCell withFixed value={purchasedData.totalPurchasePrice} />
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

const StyledProfitRate = styled(TableCell)`
  white-space: nowrap;
`;
