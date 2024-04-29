import { Table, TableBody } from '@/components/Table';
import styled from 'styled-components';
import SoldTableHeader from './SoldTableHeader';
import { SOLD_MOCK_DATA } from '@/features/sold/mockData';
import SoldItem from './SoldItem';

interface Props {}

function SoldTable({}: Props) {
  return (
    <StyledContainer>
      <StyledSoldTable>
        <SoldTableHeader />
        <TableBody>
          {SOLD_MOCK_DATA.list.allIds.map(id => (
            <SoldItem purchasedId={id} key={id} />
          ))}
        </TableBody>
      </StyledSoldTable>
    </StyledContainer>
  );
}

export default SoldTable;

const StyledContainer = styled.div`
  width: 100%;
  overflow: auto;
  max-height: calc(100vh - 180px);
`;

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
