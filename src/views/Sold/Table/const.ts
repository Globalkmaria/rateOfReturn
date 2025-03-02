import { SoldsState } from '@/features/solds';

import { HeaderItemProps } from '@/views/List/Header/HeaderItem';

import SoldSortTableHead, { SoldSortTableHeadProps } from './SoldSortTableHead';
import {
  createNumericSortFunction,
  createStringSortFunction,
  getBuyPrice,
  getBuyQuantity,
  getBuyTotal,
  getId,
  getProfit,
  getReturnRatio,
  getSoldPrice,
  getSoldTime,
  getSoldTotal,
  getStockName,
  getTag,
  getBuyTime,
} from './utils';

type SoldHeaderItemsProps =
  | HeaderItemProps
  | (HeaderItemProps &
      Pick<SoldSortTableHeadProps<SoldSortOptions>, 'options'>);

export type SortFunction = (
  list: SoldsState['list'],
) => SoldsState['list']['allIds'];

export const SORT_OPTIONS = [
  '',
  'id asc',
  'id desc',
  'stockName asc',
  'stockName desc',
  'tag asc',
  'tag desc',
  'buyQuantity asc',
  'buyQuantity desc',
  'buyDate asc',
  'buyDate desc',
  'buyUnitPrice asc',
  'buyUnitPrice desc',
  'buyTotalCost asc',
  'buyTotalCost desc',
  'soldDate asc',
  'soldDate desc',
  'soldUnitPrice asc',
  'soldUnitPrice desc',
  'soldTotalValue asc',
  'soldTotalValue desc',
  'return asc',
  'return desc',
  'rateOfReturn asc',
  'rateOfReturn desc',
] as const;

export type SoldSortOptions = (typeof SORT_OPTIONS)[number];

export const SOLD_SORT_OPTIONS_FUNCTIONS: Record<
  SoldSortOptions,
  (list: SoldsState['list']) => SoldsState['list']['allIds']
> = {
  '': list => list.allIds,
  'id asc': createNumericSortFunction(getId, true),
  'id desc': createNumericSortFunction(getId, false),
  'stockName asc': createStringSortFunction(getStockName, true),
  'stockName desc': createStringSortFunction(getStockName, false),
  'tag asc': createStringSortFunction(getTag, true),
  'tag desc': createStringSortFunction(getTag, false),
  'buyQuantity asc': createNumericSortFunction(getBuyQuantity, true),
  'buyQuantity desc': createNumericSortFunction(getBuyQuantity, false),
  'buyDate asc': createNumericSortFunction(getBuyTime, true),
  'buyDate desc': createNumericSortFunction(getBuyTime, false),
  'buyUnitPrice asc': createNumericSortFunction(getBuyPrice, true),
  'buyUnitPrice desc': createNumericSortFunction(getBuyPrice, false),
  'buyTotalCost asc': createNumericSortFunction(getBuyTotal, true),
  'buyTotalCost desc': createNumericSortFunction(getBuyTotal, false),
  'soldDate asc': createNumericSortFunction(getSoldTime, true),
  'soldDate desc': createNumericSortFunction(getSoldTime, false),
  'soldUnitPrice asc': createNumericSortFunction(getSoldPrice, true),
  'soldUnitPrice desc': createNumericSortFunction(getSoldPrice, false),
  'soldTotalValue asc': createNumericSortFunction(getSoldTotal, true),
  'soldTotalValue desc': createNumericSortFunction(getSoldTotal, false),
  'return asc': createNumericSortFunction(getProfit, true),
  'return desc': createNumericSortFunction(getProfit, false),
  'rateOfReturn asc': createNumericSortFunction(getReturnRatio, true),
  'rateOfReturn desc': createNumericSortFunction(getReturnRatio, false),
};

export const SOLD_HEADER_LIST: SoldHeaderItemsProps[] = [
  {
    id: '1',
    label: '#',
    fixedWidth: 50,
    Component: SoldSortTableHead,
    options: {
      asc: 'id asc',
      desc: 'id desc',
    },
  },
  {
    id: '2',
    label: 'Stock Name',
    fixedWidth: 120,
    Component: SoldSortTableHead,
    options: {
      asc: 'stockName asc',
      desc: 'stockName desc',
    },
  },
  {
    id: '3',
    label: 'Tag',
    fixedWidth: 70,
    Component: SoldSortTableHead,
    options: {
      asc: 'tag asc',
      desc: 'tag desc',
    },
  },
  {
    id: '4',
    label: 'Quantity',
    minWidth: 50,
    Component: SoldSortTableHead,
    options: {
      asc: 'buyQuantity asc',
      desc: 'buyQuantity desc',
    },
  },
  {
    id: '5',
    label: 'Buy Date',
    fixedWidth: 200,
    Component: SoldSortTableHead,
    options: {
      asc: 'buyDate asc',
      desc: 'buyDate desc',
    },
  },
  {
    id: '6',
    label: 'Buy Unit Price',
    minWidth: 120,
    Component: SoldSortTableHead,
    options: {
      asc: 'buyUnitPrice asc',
      desc: 'buyUnitPrice desc',
    },
  },
  {
    id: '7',
    label: 'Buy Total Cost',
    minWidth: 120,
    Component: SoldSortTableHead,
    options: {
      asc: 'buyTotalCost asc',
      desc: 'buyTotalCost desc',
    },
  },
  {
    id: '8',
    label: 'Sold Date',
    fixedWidth: 230,
    Component: SoldSortTableHead,
    options: {
      asc: 'soldDate asc',
      desc: 'soldDate desc',
    },
  },
  {
    id: '9',
    label: 'Sold Unit Price',
    minWidth: 120,
    Component: SoldSortTableHead,
    options: {
      asc: 'soldUnitPrice asc',
      desc: 'soldUnitPrice desc',
    },
  },
  {
    id: '10',
    label: 'Total Sold Value',
    minWidth: 120,
    Component: SoldSortTableHead,
    options: {
      asc: 'soldTotalValue asc',
      desc: 'soldTotalValue desc',
    },
  },
  {
    id: '11',
    label: 'Return',
    minWidth: 100,
    Component: SoldSortTableHead,
    options: {
      asc: 'return asc',
      desc: 'return desc',
    },
  },
  {
    id: '12',
    label: 'ROI (%)',
    minWidth: 100,
    Component: SoldSortTableHead,
    options: {
      asc: 'rateOfReturn asc',
      desc: 'rateOfReturn desc',
    },
  },
  {
    id: '13',
    label: 'Actions',
    fixedWidth: 80,
  },
];
