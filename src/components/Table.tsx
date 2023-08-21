import { TableHTMLAttributes } from 'react';
import styled from 'styled-components/macro';

export interface TableWithProps {
  fixedWidth?: number;
  minWidth?: number;
}

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}
interface TableHeaderProps
  extends TableHTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {}
export interface TableHeadProps
  extends TableHTMLAttributes<HTMLTableCellElement>,
    TableWithProps {}
interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {}
export interface TableCellProps
  extends TableHTMLAttributes<HTMLTableCellElement>,
    TableWithProps {
  align?: 'left' | 'center' | 'right';
}

export const Table = styled('table')<TableProps>(({ theme }) => ({
  borderSpacing: '0px',
  borderCollapse: 'separate',
  width: '100%',
}));

export const TableHeader = styled('thead')<TableHeaderProps>(({ theme }) => ({
  fontSize: '0.9rem',
  height: '40px',
  borderTop: `1px solid ${theme.colors.grey400}`,
  borderBottom: `1px solid ${theme.colors.grey400}`,
}));

export const TableBody = styled('tbody')<TableBodyProps>(({ theme }) => ({
  fontSize: '1rem',
}));

export const TableHead = styled('th')<TableHeadProps>(
  ({ theme, fixedWidth, minWidth }) => ({
    borderTop: `1px solid ${theme.colors.grey400}`,
    borderBottom: `1px solid ${theme.colors.grey400}`,
    padding: '0.4rem',
    ...(fixedWidth && {
      width: fixedWidth + 'px',
      minWidth: fixedWidth + 'px',
    }),
    ...(minWidth && { minWidth: minWidth + 'px' }),
    background: theme.colors.white,

    '&:nth-child(n+1)': {
      borderRight: `1px solid ${theme.colors.grey400}`,
    },

    '&:last-child': {
      borderRight: 'none',
    },

    '&:nth-child(odd)': {
      background: theme.colors.grey300,
    },
  }),
);

export const TableRow = styled('tr')<TableRowProps>(({ theme }) => ({
  borderBottom: `1px solid ${theme.colors.grey400}`,
}));

export const TableCell = styled('td')<TableCellProps>(
  ({ theme, fixedWidth, minWidth, align = 'left' }) => ({
    padding: '0.4rem',
    ...(fixedWidth && {
      width: fixedWidth + 'px',
      minWidth: fixedWidth + 'px',
    }),

    borderBottom: `1px solid ${theme.colors.grey400}`,
    ...(minWidth && { minWidth: minWidth + 'px' }),

    textAlign: align,

    '&:nth-child(n+1)': {
      borderRight: `1px solid ${theme.colors.grey400}`,
    },
    '&:last-child': {
      borderRight: 'none',
    },
  }),
);
