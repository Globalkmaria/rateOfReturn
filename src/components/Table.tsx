import React, { TableHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}
interface TableHeaderProps
  extends TableHTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {}
interface TableHeadProps extends TableHTMLAttributes<HTMLTableCellElement> {
  width?: number;
  flexBasis?: number;
}
interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {}
interface TableCellProps extends TableHTMLAttributes<HTMLTableCellElement> {
  width?: number;
  flexBasis?: number;
  align?: 'left' | 'center' | 'right';
}

export const Table = styled('table')<TableProps>(({ theme }) => ({
  borderCollapse: 'collapse',
  width: '100%',
}));

export const TableHeader = styled('thead')<TableHeaderProps>(({ theme }) => ({
  height: '40px',
  borderTop: `1px solid ${theme.colors.grey400}`,
  borderBottom: `1px solid ${theme.colors.grey400}`,
}));

export const TableBody = styled('tbody')<TableBodyProps>(({ theme }) => ({
  fontSize: '1rem',
}));

export const TableHead = styled('th')<TableHeadProps>(
  ({ theme, width, flexBasis }) => ({
    padding: '0.4rem',
    ...(width ? { minWidth: width + 'px' } : { flex: 1 }),
    ...(flexBasis
      ? {
          flexBasis: flexBasis + 'px',
          minWidth: flexBasis + 'px',
          flexShrink: 0,
        }
      : {}),

    '&:nth-child(n+2)': {
      borderLeft: `1px solid ${theme.colors.grey400}`,
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
  ({ theme, width, flexBasis, align = 'left' }) => ({
    padding: '0.4rem',
    ...(width ? { minWidth: width + 'px' } : { flex: 1 }),
    ...(flexBasis
      ? {
          flexBasis: flexBasis + 'px',
          minWidth: flexBasis + 'px',
          flexShrink: 0,
        }
      : {}),
    textAlign: align,

    '&:nth-child(n+2)': {
      borderLeft: `1px solid ${theme.colors.grey400}`,
    },
  }),
);
