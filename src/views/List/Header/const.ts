import { TableHead } from '@/components/Table';

import CheckAllCheckbox from './CheckAllCheckbox';
import { HeaderItemProps, StyledBuyId, StyledStockName } from './HeaderItem';

export const HEADER_LIST: HeaderItemProps[] = [
  {
    id: '1',
    label: 'Select All',
    Component: CheckAllCheckbox,
    notTableHead: true,
    fixedWidth: 50,
  },
  {
    id: '2',
    label: 'Stock Name',
    fixedWidth: 180,
    Component: StyledStockName,
    notTableHead: false,
  },
  {
    id: '3',
    label: '#',
    fixedWidth: 50,
    Component: StyledBuyId,
    notTableHead: false,
  },
  { id: '4', label: 'Tag / Buy Date', fixedWidth: 230 },
  { id: '5', label: 'Buy Quantity', minWidth: 50 },
  { id: '6', label: 'Avg Buy Unit Price', minWidth: 120 },
  {
    id: '7',
    label: 'Total Buy Cost',
    minWidth: 120,
    Component: TableHead,
    notTableHead: false,
  },
  { id: '8', label: 'Current Unit Price', minWidth: 120 },
  { id: '9', label: 'Current Total Value', minWidth: 100 },
  { id: '10', label: 'Return', minWidth: 100 },
  { id: '11', label: 'Rate of Return', minWidth: 90 },
  { id: '12', label: 'Actions', fixedWidth: 80 },
];

const NOT_SUBGROUP_COL = ['1', '12'];
export const SUB_GROUP_HEADER_LIST: HeaderItemProps[] = [
  ...HEADER_LIST.filter(h => !NOT_SUBGROUP_COL.includes(h.id)),
  {
    id: '13',
    label: 'Action',
    fixedWidth: 50,
  },
];
