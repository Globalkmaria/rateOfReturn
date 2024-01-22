import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { TableHeader, TableRow } from '../../../components/Table';
import { selectIsMainGroupSelected } from '../../../features/groups/selectors';
import HeaderItem from './HeaderItem';
import { HEADER_LIST, SUB_GROUP_HEADER_LIST } from './const';

const StockListHeader = () => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const header = isMainGroupSelected ? HEADER_LIST : SUB_GROUP_HEADER_LIST;
  return (
    <StyledHeader>
      <TableRow>
        {header.map(item => (
          <HeaderItem {...item} key={item.id} />
        ))}
      </TableRow>
    </StyledHeader>
  );
};

export default memo(StockListHeader);

const StyledHeader = styled(TableHeader)`
  height: 48px;
`;
