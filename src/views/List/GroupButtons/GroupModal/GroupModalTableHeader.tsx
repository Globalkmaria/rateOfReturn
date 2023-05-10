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
    label: '종목명',
    width: 150,
  },
  {
    id: '2',
    label: '번호',
    width: 50,
  },
  {
    id: '3',
    label: '매입일',
    width: 200,
  },
  {
    id: '4',
    label: '매입수량',
    width: 100,
  },
  {
    id: '5',
    label: '매입가',
    flexBasis: 120,
  },
  {
    id: '6',
    label: '총매입금액',
    flexBasis: 150,
  },
];
