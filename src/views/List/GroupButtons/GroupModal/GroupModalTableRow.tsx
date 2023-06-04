import { useDispatch, useSelector } from 'react-redux';
import { updateCheckedItems } from '../../../../features/checkedItems/checkedItemsSlice';
import { selectIsPurchasedItemChecked } from '../../../../features/checkedItems/selectors';
import { selectStockInfoById } from '../../../../features/stockList/selectors';
import { CheckboxCell } from '../../StockItem/components';
import { TableCell, TableRow } from '../../../../components/Table';
import { Input } from '../../../../components/Input';
import styled from 'styled-components';

type GroupModalTableRowProps = {
  stockId: string;
  purchasedId: string;
};

const GroupModalTableRow = ({
  stockId,
  purchasedId,
}: GroupModalTableRowProps) => {
  const dispatch = useDispatch();
  const isChecked = useSelector(
    selectIsPurchasedItemChecked(stockId, purchasedId),
  );
  const { mainInfo, purchasedItems } = useSelector(
    selectStockInfoById(stockId),
  );
  const purchasedInfo = purchasedItems.byId[purchasedId];
  const totalPurchasedPrice =
    purchasedInfo.purchasedQuantity * purchasedInfo.purchasedPrice;

  const onCheck = (value: boolean) => {
    dispatch(
      updateCheckedItems({
        type: 'purchased',
        checked: value,
        stockId,
        purchasedId,
      }),
    );
  };

  return (
    <StyledTableRow>
      <CheckboxCell value={isChecked} onClick={onCheck} />
      <TableCell>{mainInfo.stockName}</TableCell>
      <TableCell align='center'>{purchasedInfo.purchasedId}</TableCell>
      <TableCell>
        <Input
          padding={0}
          value={purchasedInfo.purchasedDate}
          type='date'
          disabled
        />
      </TableCell>
      <TableCell align='right'>
        {purchasedInfo.purchasedQuantity.toString()}
      </TableCell>
      <TableCell align='right'>
        {purchasedInfo.purchasedPrice.toLocaleString()}
      </TableCell>
      <TableCell align='right'>
        {totalPurchasedPrice.toLocaleString()}
      </TableCell>
    </StyledTableRow>
  );
};

export default GroupModalTableRow;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }
`;
