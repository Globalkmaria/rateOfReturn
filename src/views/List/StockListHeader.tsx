import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';

import {
  TableHead,
  TableHeader,
  TableHeadProps,
  TableRow,
} from '../../components/Table';
import { CheckboxCell } from './StockItem/components';
import { updateCheckedItems } from '../../features/checkedItems/checkedItemsSlice';
import { selectIsAllChecked } from '../../features/checkedItems/selectors';
import { selectIsMainGroupSelected } from '../../features/groups/selectors';
import { memo } from 'react';

type HeaderListComponent = typeof CheckAllCheckbox;

type HeaderListProps = {
  id: string;
  label: string;
  Component?: HeaderListComponent;
  fixedWidth?: number;
  minWidth?: number;
  className?: string;
}[];

const StockListHeader = () => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const header = isMainGroupSelected ? HEADER_LIST : SUB_GROUP_HEADER_LIST;
  return (
    <TableHeader>
      <StyledStockTableRow>
        {header.map(({ id, label, Component, ...restProps }) =>
          Component ? (
            <Component key={id} id={id} {...restProps} />
          ) : (
            <TableHead key={id} {...restProps}>
              {label}
            </TableHead>
          ),
        )}
      </StyledStockTableRow>
    </TableHeader>
  );
};

export default memo(StockListHeader);

const CheckAllCheckbox = ({ id, ...restProps }: TableHeadProps) => {
  const dispatch = useDispatch();
  const isAllChecked = useSelector(selectIsAllChecked());
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected);
  const onChangeCheckbox = (value: boolean) => {
    dispatch(
      updateCheckedItems({
        type: 'all',
        checked: value,
      }),
    );
  };
  return (
    <CheckboxCell
      title='Check all checkboxes'
      type='th'
      key={id}
      {...restProps}
      onClick={onChangeCheckbox}
      value={isAllChecked}
      disabled={!isMainGroupSelected}
    />
  );
};

const HEADER_LIST: HeaderListProps = [
  {
    id: '1',
    label: 'Select All',
    Component: CheckAllCheckbox,
    fixedWidth: 50,
    className: 'check-all',
  },
  { id: '2', label: 'Stock Name', fixedWidth: 120, className: 'stock-name' },
  { id: '3', label: '#', fixedWidth: 50, className: 'buy-id' },
  { id: '4', label: 'Buy Date', fixedWidth: 230 },
  { id: '5', label: 'Buy Quantity', fixedWidth: 100 },
  { id: '6', label: 'Avg Buy Unit Price', minWidth: 120 },
  {
    id: '7',
    label: 'Total Buy Cost',
    minWidth: 150,
    className: 'total-purchase',
  },
  { id: '8', label: 'Current Unit Price', minWidth: 120 },
  { id: '9', label: 'Current Total Value', minWidth: 100 },
  { id: '10', label: 'Return', minWidth: 100 },
  { id: '11', label: 'Rate of Return', minWidth: 100 },
  { id: '12', label: 'Edit', fixedWidth: 50 },
  { id: '13', label: 'Delete', fixedWidth: 50 },
];

const NOT_SUBGROUP_COL = ['1', '12', '13'];
const SUB_GROUP_HEADER_LIST: HeaderListProps = HEADER_LIST.filter(
  (h) => !NOT_SUBGROUP_COL.includes(h.id),
);

const StyledStockTableRow = styled(TableRow)`
  .total-purchase {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }
`;
