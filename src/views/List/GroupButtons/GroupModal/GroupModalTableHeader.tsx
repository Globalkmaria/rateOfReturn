import { TableHead, TableHeader, TableRow } from '../../../../components/Table';

interface HeaderItemProps {
  id: string;
  label: string;
  width?: number;
  flexBasis?: number;
}

const GroupModalTableHead = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead width={40}></TableHead>
        {HEADER_LIST.map(({ id, label, ...restProps }) => (
          <TableHead key={id} id={id} {...restProps}>
            {label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default GroupModalTableHead;

const HEADER_LIST: HeaderItemProps[] = [
  {
    id: '1',
    label: 'Stock Name',
    width: 150,
  },
  {
    id: '2',
    label: 'Purchase ID',
    width: 50,
  },
  {
    id: '3',
    label: 'Purchase Date',
    width: 200,
  },
  {
    id: '4',
    label: 'Purchase Quantity',
    width: 100,
  },
  {
    id: '5',
    label: 'Purchase Unit Price',
    flexBasis: 120,
  },
  {
    id: '6',
    label: 'Total Purchase Cost',
    flexBasis: 150,
  },
];
