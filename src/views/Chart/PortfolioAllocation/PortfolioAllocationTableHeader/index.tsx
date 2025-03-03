import SortTableHead, {
  SortTableHeadProps,
} from '@/components/table/sort/SortTableHead';
import { TableHead, TableHeader, TableRow } from '@/components/table/Table';

import { PortfolioAllocationSortOptions } from './const';

type Props = Pick<
  SortTableHeadProps<PortfolioAllocationSortOptions>,
  'currentOption' | 'onSortChange'
>;

function PortfolioAllocationTableHeader(props: Props) {
  return (
    <TableHeader>
      <TableRow>
        <SortTableHead
          fixedWidth={180}
          rowSpan={2}
          options={{ asc: 'name asc', desc: 'name desc' }}
          {...props}
        >
          Name
        </SortTableHead>
        <SortTableHead
          colSpan={2}
          options={{ asc: 'buyPrice asc', desc: 'buyPrice desc' }}
          {...props}
        >
          Buy
        </SortTableHead>
        <SortTableHead
          colSpan={2}
          {...props}
          options={{ asc: 'currentPrice asc', desc: 'currentPrice desc' }}
        >
          Current
        </SortTableHead>
      </TableRow>
      <TableRow>
        <TableHead width={110} {...props}>
          %
        </TableHead>
        <TableHead width={180} {...props}>
          Total Price
        </TableHead>
        <TableHead width={110} {...props}>
          %
        </TableHead>
        <TableHead width={180} {...props}>
          Total Price
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default PortfolioAllocationTableHeader;
