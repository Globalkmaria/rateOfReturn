import { useSelector } from 'react-redux';
import { selectCheckedPurchasedItems } from '../../../../features/checkedItems/selectors';
import GroupModalTableHead from './GroupModalTableHeader';
import { Table, TableBody } from '../../../../components/Table';
import GroupModalTableRow from './GroupModalTableRow';

const GroupModalTable = () => {
  return (
    <Table>
      <GroupModalTableHead />
      <GroupModalTableBody />
    </Table>
  );
};

export default GroupModalTable;

const GroupModalTableBody = () => {
  const checkedItems = useSelector(selectCheckedPurchasedItems());

  return (
    <TableBody>
      {checkedItems.map(({ stockId, purchasedId }) => (
        <GroupModalTableRow
          key={purchasedId}
          stockId={stockId}
          purchasedId={purchasedId}
        />
      ))}
    </TableBody>
  );
};
