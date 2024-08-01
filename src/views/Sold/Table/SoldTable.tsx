import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';

import { Table, TableBody } from '@/components/Table';
import { selectSoldList } from '@/features/solds';
import SoldTableHeader from './SoldTableHeader';
import SoldItem from './SoldItem';
import { SOLD_SORT_OPTIONS_FUNCTIONS, SoldSortOptions } from './const';
import { validateSoldQuery } from './helper';

interface Props {}

function SoldTable({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') ?? '';
  const soldList = useSelector(selectSoldList);

  if (!validateSoldQuery(sortBy)) return null;

  const sortedList = SOLD_SORT_OPTIONS_FUNCTIONS[sortBy](soldList);
  const handleSortChange = (sortBy: SoldSortOptions) =>
    setSearchParams({ sortBy });

  return (
    <StyleSoldTableWrapper>
      <StyledSoldTable>
        <SoldTableHeader
          currentOption={sortBy}
          onChangeSort={handleSortChange}
        />
        <TableBody>
          {sortedList.map(id => (
            <SoldItem id={id} key={id} />
          ))}
        </TableBody>
      </StyledSoldTable>
    </StyleSoldTableWrapper>
  );
}

export default SoldTable;
const StyleSoldTableWrapper = styled.div`
  overflow-x: overlay;
`;

const StyledSoldTable = styled(Table)`
  th,
  td {
    font-size: 0.8rem;
  }

  thead th {
    position: sticky;
    z-index: 2;
    top: 0;
  }

  th button {
    font-weight: 500;
    white-space: nowrap;
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

  tbody tr {
    height: 46px;
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
    th button,
    input {
      font-size: 0.8rem;
    }

    thead tr > :nth-child(2) {
      min-width: 100px;
    }
  }
`;
