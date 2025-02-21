import { useSelector } from 'react-redux';

import styled from 'styled-components';

import GroupModalTableHead from './GroupModalTableHeader';
import GroupModalTableRow from './GroupModalTableRow';
import { Table, TableBody } from '../../../../components/Table';
import { selectCheckedPurchasedItems } from '../../../../features/checkedItems/selectors';

const GroupModalTable = () => {
  return (
    <StyledContainer>
      <Table>
        <GroupModalTableHead />
        <GroupModalTableBody />
      </Table>
    </StyledContainer>
  );
};

export default GroupModalTable;

const GroupModalTableBody = () => {
  const checkedItems = useSelector(selectCheckedPurchasedItems);

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

const StyledContainer = styled.div`
  max-width: 1000px;
  width: 70vw;
  max-height: 500px;
  overflow: auto;
`;
