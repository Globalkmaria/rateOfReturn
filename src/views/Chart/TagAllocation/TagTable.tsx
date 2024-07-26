import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table';
import styled from 'styled-components';
import { TagsInfo } from './utils';
import { Ellipsis } from '@/components/Text';

interface Props {
  tagsInfo: TagsInfo;
}

function TagTable({ tagsInfo }: Props) {
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledTable>
          <TableHeader>
            <TableRow>
              <TableHead fixedWidth={180} rowSpan={2}>
                Name
              </TableHead>
              <TableHead colSpan={2}>Buy</TableHead>
              <TableHead colSpan={2}>Current</TableHead>
            </TableRow>
            <TableRow>
              <TableHead width={110}>%</TableHead>
              <TableHead width={180}>Total Price</TableHead>
              <TableHead width={110}>%</TableHead>
              <TableHead width={180}>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tagsInfo.tags.map(tag => (
              <Item key={tag} tag={tag} tagsInfo={tagsInfo} />
            ))}
          </TableBody>
        </StyledTable>
      </StyledContainer>
    </StyledWrapper>
  );
}

export default TagTable;

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
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.white};
  text-wrap: nowrap;

  td {
    padding: 0.4rem;
  }

  th:first-child {
    @media ${({ theme }) => theme.devices.mobile} {
      width: 100px;
      min-width: 100px;
    }
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
  tag: string;
  tagsInfo: TagsInfo;
}
function Item({ tag, tagsInfo }: ItemProps) {
  return (
    <TableRow>
      <TableCell>
        <StyledEllipsis width={180}>{tag}</StyledEllipsis>
      </TableCell>
      <TableCell align='right'>{tagsInfo.buyPrice[tag].percent} %</TableCell>
      <TableCell align='right'>{tagsInfo.buyPrice[tag].totalPrice}</TableCell>
      <TableCell align='right'>
        {tagsInfo.currentPrice[tag].percent} %
      </TableCell>
      <TableCell align='right'>
        {tagsInfo.currentPrice[tag].totalPrice}
      </TableCell>
    </TableRow>
  );
}

const StyledEllipsis = styled(Ellipsis)`
  @media ${({ theme }) => theme.devices.mobile} {
    width: 100px;
  }
`;
