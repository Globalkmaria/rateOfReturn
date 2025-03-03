import { TableHTMLAttributes } from 'react';

import styled from 'styled-components';

export interface TableWidthProps {
  fixedWidth?: number;
  minWidth?: number;
}

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}
interface TableHeaderProps
  extends TableHTMLAttributes<HTMLTableSectionElement> {}
interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {}
export type TableHeadProps = TableHTMLAttributes<HTMLTableCellElement> &
  TableWidthProps;
interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {}
export interface TableCellProps
  extends TableHTMLAttributes<HTMLTableCellElement>,
    TableWidthProps {
  align?: 'left' | 'center' | 'right';
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

export const Table = styled('table')<TableProps>(() => ({
  borderSpacing: '0px',
  borderCollapse: 'separate',
  width: '100%',
}));

export const TableHeader = styled('thead')<TableHeaderProps>(({ theme }) => ({
  fontSize: '0.9rem',
  height: '40px',
  borderTop: `1px solid ${theme.colors.grey400}`,
  borderBottom: `1px solid ${theme.colors.grey400}`,

  '& tr:first-child th:first-child': {
    borderTopLeftRadius: '5px',
  },

  '& tr:first-child th:last-child': {
    borderTopRightRadius: '5px',
  },
}));

export const TableBody = styled('tbody')<TableBodyProps>(({ theme }) => ({
  fontSize: '1rem',

  '& tr:last-child td:nth-child(1)': {
    borderBottomLeftRadius: '5px',
  },

  '& tr:last-child td:last-child': {
    borderBottomRightRadius: '5px',
  },
}));

export const TableHead = styled('th').withConfig({
  shouldForwardProp: prop => !['fixedWidth', 'minWidth'].includes(prop),
})<TableHeadProps>(({ theme, fixedWidth, minWidth }) => ({
  padding: '0.4rem',
  ...(fixedWidth && {
    width: fixedWidth + 'px',
    minWidth: fixedWidth + 'px',
  }),
  ...(minWidth && { minWidth: minWidth + 'px' }),
  background: theme.colors.grey100,
  borderTop: `1px solid ${theme.colors.grey400}`,
  borderRight: `1px solid ${theme.colors.grey400}`,
  borderBottom: `1px solid ${theme.colors.grey400}`,

  '&:nth-child(1)': {
    borderLeft: `1px solid ${theme.colors.grey400}`,
  },
}));

export const TableRow = styled('tr')<TableRowProps>(({}) => ({}));

export const TableCell = styled('td').withConfig({
  shouldForwardProp: prop =>
    !['fixedWidth', 'minWidth', 'align'].includes(prop),
})<TableCellProps>(({ theme, fixedWidth, minWidth, align = 'left' }) => ({
  padding: '0px 0.4rem',
  ...(fixedWidth && {
    width: fixedWidth + 'px',
    minWidth: fixedWidth + 'px',
  }),

  borderRight: `1px solid ${theme.colors.grey400}`,
  borderBottom: `1px solid ${theme.colors.grey400}`,
  ...(minWidth && { minWidth: minWidth + 'px' }),

  textAlign: align,

  '&:nth-child(1)': {
    borderLeft: `1px solid ${theme.colors.grey400}`,
  },
}));
