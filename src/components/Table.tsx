import React, { TableHTMLAttributes } from 'react';
import styled from 'styled-components';

interface TableHeadProps extends TableHTMLAttributes<HTMLTableCellElement> {
  width?: number;
  flexBasis?: number;
}
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
      background: theme.colors.grey100,
    },
  }),
);

interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {}
export const TableRow = styled('tr')<TableRowProps>(({ theme }) => ({
  borderBottom: `1px solid ${theme.colors.grey400}`,
}));

interface TableCellProps extends TableHTMLAttributes<HTMLTableCellElement> {
  width?: number;
  flexBasis?: number;
}
export const TableCell = styled('td')<TableCellProps>(
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
  }),
);

interface TableHeadsProps
  extends TableHTMLAttributes<HTMLTableSectionElement> {}
export const TableHeads = styled('thead')<TableHeadsProps>(({ theme }) => ({
  borderTop: `1px solid ${theme.colors.grey400}`,
  borderBottom: `1px solid ${theme.colors.grey400}`,
}));

interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {}
export const TableBody = styled('tbody')<TableBodyProps>(({ theme }) => ({}));

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}
export const Table = styled('table')<TableProps>(({ theme }) => ({
  borderCollapse: 'collapse',
  width: '100%',
}));
