import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { selectSoldList } from '@/features/solds';

import useSort from '@/components/table/sort/useSort';
import { Table, TableBody } from '@/components/table/Table';

import { SOLD_SORT_OPTIONS_FUNCTIONS, SOLD_SORT_OPTIONS } from './const';
import NoSold from './NoSold';
import SoldItem from './SoldItem';
import SoldTableHeader from './SoldTableHeader';

function SoldTable() {
  const soldList = useSelector(selectSoldList);
  const sortProps = useMemo(
    () => ({
      ids: soldList.allIds,
      items: soldList.byId,
      sortOptions: SOLD_SORT_OPTIONS,
      sortFunctions: SOLD_SORT_OPTIONS_FUNCTIONS,
      sortFunctionProps: {
        ids: soldList.allIds,
        items: soldList.byId,
      },
    }),
    [soldList],
  );
  const { sortBy, isValidSortBy, sortedList, onSortChange } =
    useSort(sortProps);

  if (!isValidSortBy) return null;

  const noSold = !sortedList.length;

  return (
    <StyleSoldTableWrapper>
      <StyledSoldTable>
        <SoldTableHeader currentOption={sortBy} onSortChange={onSortChange} />
        <TableBody>
          {sortedList.map(id => (
            <SoldItem id={id} key={id} />
          ))}
        </TableBody>
      </StyledSoldTable>
      {noSold && <NoSold />}
    </StyleSoldTableWrapper>
  );
}

export default SoldTable;
const StyleSoldTableWrapper = styled.div`
  overflow-x: overlay;
  padding-bottom: 100px;
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
