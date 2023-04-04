import React from 'react';
import { TableHead, TableHeader, TableRow } from '../../components/Table';

type HeaderListProps = {
  label: string;
  width?: number;
  flexBasis?: number;
}[];

const StockListHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        {HEADER_LIST.map(({ label, ...restProps }) => (
          <TableHead key={label} {...restProps}>
            {label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default StockListHeader;

const HEADER_LIST: HeaderListProps = [
  { label: '종목명', flexBasis: 150 },
  { label: '번호', width: 50 },
  { label: '매입일' },
  { label: '매입수량', width: 100 },
  { label: '매입가', flexBasis: 120 },
  { label: '총매입금액', flexBasis: 150 },
  { label: '현재가', flexBasis: 120 },
  { label: '평가금액', flexBasis: 100 },
  { label: '평가손익', flexBasis: 100 },
  { label: '손익률', flexBasis: 100 },
  { label: '잠금' },
  { label: '삭제' },
];
