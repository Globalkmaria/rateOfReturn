import { TableHeader, TableRow } from '@/components/Table';
import HeaderItem from '@/views/List/Header/HeaderItem';
import { SoldSortTableHeadProps } from './SoldSortTableHead';
import { SOLD_HEADER_LIST, SoldSortOptions } from './const';

type Props = Pick<
  SoldSortTableHeadProps<SoldSortOptions>,
  'currentOption' | 'onChangeSort'
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
