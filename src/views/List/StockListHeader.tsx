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
import styled from 'styled-components';

type HeaderListComponent = typeof CheckAllCheckbox;

type HeaderListProps = {
  id: string;
  label: string;
  Component?: HeaderListComponent;
  width?: number;
  flexBasis?: number;
  className?: string;
}[];

const StockListHeader = () => {
  return (
    <TableHeader>
      <StyledStockTableRow>
        {HEADER_LIST.map(({ id, label, Component, ...restProps }) =>
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

export default StockListHeader;

const StyledStockTableRow = styled(TableRow)`
  .total-purchase {
    border-right: ${({ theme }) => `4px double ${theme.colors.grey600}`};
  }
`;

const CheckAllCheckbox = ({ id, ...restProps }: TableHeadProps) => {
  const dispatch = useDispatch();
  const isAllChecked = useSelector(selectIsAllChecked());
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
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
  { id: '1', label: 'Select All', Component: CheckAllCheckbox, width: 50 },
  { id: '2', label: 'Stock Name', flexBasis: 120 },
  { id: '3', label: 'Purchase ID', width: 50 },
  { id: '4', label: 'Purchase Date' },
  { id: '5', label: 'Purchase Quantity', width: 100 },
  { id: '6', label: 'Avg Purchase Unit Price', flexBasis: 120 },
  {
    id: '7',
    label: 'Total Purchase Cost',
    flexBasis: 150,
    className: 'total-purchase',
  },
  { id: '8', label: 'Current Unit Price', flexBasis: 120 },
  { id: '9', label: 'Current Total Value', flexBasis: 100 },
  { id: '10', label: 'Return', flexBasis: 100 },
  { id: '11', label: 'Rate of Return', flexBasis: 100 },
  { id: '12', label: 'Lock', width: 50 },
  { id: '13', label: 'Delete', width: 50 },
];
