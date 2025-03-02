import HeaderItem from '@/views/List/Header/HeaderItem';

import { TableHeader, TableRow } from '@/components/table/Table';

import { SOLD_HEADER_LIST, SoldSortOptions } from './const';
import { SortTableHeadProps } from '../../../components/table/sort/SortTableHead';

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
