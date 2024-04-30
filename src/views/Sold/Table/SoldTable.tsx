import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Table, TableBody } from '@/components/Table';
import SoldTableHeader from './SoldTableHeader';
import SoldItem from './SoldItem';
import { selectSoldList } from '@/features/solds';

interface Props {}

function SoldTable({}: Props) {
  const soldList = useSelector(selectSoldList);

  return (
    <StyledSoldTable>
      <SoldTableHeader />
      <TableBody>
        {soldList.allIds.map(id => (
          <SoldItem id={id} key={id} />
        ))}
      </TableBody>
    </StyledSoldTable>
  );
}

export default SoldTable;

const StyledSoldTable = styled(Table)`
  thead th {
    position: sticky;
    z-index: 2;
    top: 0;
  }

  thead tr > :first-child,
  thead tr > :nth-child(2) {
    z-index: 3;
    left: 0;
    top: 0;
  }

  thead tr > :nth-child(2) {
    left: 50px;
  }

  tbody tr > :first-child,
  tbody tr > :nth-child(2) {
    background: ${({ theme }) => theme.colors.white};
    position: sticky;
    z-index: 1;
    left: 0;
  }

  tbody tr > :first-child {
    background: ${({ theme }) => theme.colors.grey100};
  }

  tbody tr > :nth-child(2) {
    left: 50px;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    thead th,
    tbody td,
    input {
      font-size: 0.8rem;
    }

    thead tr > :nth-child(2) {
      min-width: 100px;
    }
  }
`;
