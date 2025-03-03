import HeaderItem from '@/views/List/Header/HeaderItem';

import { SortTableHeadProps } from '@/components/table/sort/SortTableHead';
import { TableHeader, TableRow } from '@/components/table/Table';

import { SOLD_HEADER_LIST, SoldSortOptions } from './const';

type Props = Pick<
  SortTableHeadProps<SoldSortOptions>,
  'currentOption' | 'onSortChange'
>;

function SoldTableHeader(props: Props) {
  return (
    <TableHeader>
      <TableRow>
        {SOLD_HEADER_LIST.map(item => (
          <HeaderItem
            {...(item.Component ? props : {})}
            {...item}
            key={item.id}
          />
        ))}
      </TableRow>
    </TableHeader>
  );
}

export default SoldTableHeader;
