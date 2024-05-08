import { TableHeader, TableRow } from '@/components/Table';
import HeaderItem, { HeaderItemProps } from '@/views/List/Header/HeaderItem';

interface Props {}

function SoldTableHeader({}: Props) {
  return (
    <TableHeader>
      <TableRow>
        {HEADER_LIST.map(item => (
          <HeaderItem {...item} key={item.id} />
        ))}
      </TableRow>
    </TableHeader>
  );
}

export default SoldTableHeader;

const HEADER_LIST: HeaderItemProps[] = [
  {
    id: '1',
    label: '#',
    fixedWidth: 50,
  },
  {
    id: '2',
    label: 'Stock Name',
    fixedWidth: 120,
  },
  {
    id: '3',
    label: 'Tag',
    fixedWidth: 70,
  },
  {
    id: '4',
    label: 'Quantity',
    minWidth: 50,
  },
  { id: '5', label: 'Buy Date', fixedWidth: 200 },
  { id: '6', label: 'Buy Unit Price', minWidth: 120 },
  {
    id: '7',
    label: 'Total Buy Cost',
    minWidth: 120,
  },
  { id: '8', label: 'Sold Date', fixedWidth: 230 },
  { id: '9', label: 'Sold Unit Price', minWidth: 120 },
  { id: '10', label: 'Total Sold Value', minWidth: 120 },
  { id: '11', label: 'Return', minWidth: 100 },
  { id: '12', label: 'Rate of Return', minWidth: 100 },
  { id: '13', label: 'Actions', fixedWidth: 80 },
];
