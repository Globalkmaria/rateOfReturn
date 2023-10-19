import { Dispatch, SetStateAction } from 'react';
import { TableCell } from '../../../../components/Table';
import PurchasedInput from './PurchasedInput';
import { NumberCell } from '../components';
import { useSelector } from 'react-redux';
import { selectPurchasedItemsById } from '../../../../features/stockList/selectors';
import { getPurchasedData } from './utils';
import { ChangedPurchasedItemInputs } from './PurchasedStock';

type Props = {
  stockId: string;
  purchasedId: string;
  isLock: boolean;
  setChangedInputs: Dispatch<SetStateAction<ChangedPurchasedItemInputs>>;
};

const PurchasedContent = ({
  stockId,
  purchasedId,
  setChangedInputs,
  isLock,
}: Props) => {
  const { mainInfo, purchasedItem } = useSelector(
    selectPurchasedItemsById(stockId, purchasedId),
  );
  const purchasedData = getPurchasedData({ purchasedItem, mainInfo });
  return (
    <>
      <TableCell className='stock-name'>{mainInfo.stockName}</TableCell>
      <TableCell align='center'>{purchasedId}</TableCell>
      <PurchasedInput
        stockId={stockId}
        purchasedId={purchasedId}
        setChangedInputs={setChangedInputs}
        purchasedItem={purchasedItem}
        isLock={isLock}
      />
      <NumberCell
        value={purchasedData.totalPurchasePrice}
        className='total-purchase'
      />
      <NumberCell value={mainInfo.currentPrice} />
      <NumberCell value={purchasedData.evaluationPrice} />
      <TableCell align='right'>
        {purchasedData.formattedEvaluationProfit}
      </TableCell>
      <TableCell align='right'>{purchasedData.formattedProfitRate}</TableCell>
    </>
  );
};

export default PurchasedContent;
