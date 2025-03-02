import {
  TableHead,
  TableHeader,
  TableRow,
  TableWithProps,
} from '../../../../components/table/Table';

interface HeaderItemProps extends TableWithProps {
  id: string;
  label: string;
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
    fixedWidth: 150,
  },
  {
    id: '2',
    label: 'Purchase ID',
    fixedWidth: 50,
  },
  {
    id: '3',
    label: 'Purchase Date',
    fixedWidth: 200,
  },
  {
    id: '4',
    label: 'Purchase Quantity',
    fixedWidth: 100,
  },
  {
    id: '5',
    label: 'Purchase Unit Price',
    minWidth: 120,
  },
  {
    id: '6',
    label: 'Total Purchase Cost',
    minWidth: 150,
  },
];
