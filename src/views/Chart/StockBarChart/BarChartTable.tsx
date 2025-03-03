import styled from 'styled-components';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table/Table';

import { StockBarChartInfo, StockBarChartInfos } from './utils';

interface Props {
  stockBarChartInfos: StockBarChartInfos;
}

function BarChartTable({ stockBarChartInfos }: Props) {
  const data = [...stockBarChartInfos.entries()];

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledTable>
          <TableHeader>
            <TableRow>
              <TableHead width={50}>#</TableHead>
              <TableHead width={160}>Date</TableHead>
              <TableHead width={200}>%</TableHead>
              <TableHead width={240}>Profit & Loss</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(([id, info]) => (
              <Item key={id} info={info} />
            ))}
          </TableBody>
        </StyledTable>
      </StyledContainer>
    </StyledWrapper>
  );
}

export default BarChartTable;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledContainer = styled.div`
  overflow: auto;
`;

const StyledTable = styled(Table)`
  margin-top: 20px;
  max-width: 1200px;
  background-color: ${({ theme }) => theme.colors.white};
  text-wrap: nowrap;

  td {
    padding: 0.4rem;
  }

  tbody tr > :first-child {
    background: ${({ theme }) => theme.colors.grey100};
  }

  tbody tr {
    &:hover {
      background: ${({ theme }) => theme.colors.grey100};
    }
  }

  thead tr:first-child > th:first-child,
  tbody tr > :first-child {
    position: sticky;
    z-index: 2;
    left: 0;
  }
`;

interface ItemProps {
  info: StockBarChartInfo;
}
function Item({ info }: ItemProps) {
  return (
    <TableRow>
      <TableCell align='center'>{info.purchasedId}</TableCell>
      <TableCell align='center'>{info.date}</TableCell>
      <TableCell align='right'>{info.ratio} %</TableCell>
      <TableCell align='right'>{info.profit}</TableCell>
    </TableRow>
  );
}
