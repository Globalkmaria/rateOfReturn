import { Sold } from '@/features/solds';

import { HeaderItemProps } from '@/views/List/Header/HeaderItem';

import SortTableHead, {
  SortTableHeadProps,
} from '@/components/table/sort/SortTableHead';
import {
  createNumericSortFunction,
  createStringSortFunction,
  DeepSortFunction,
  ExtractFunction,
} from '@/components/table/sort/utils';

import {
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
  | (HeaderItemProps & Pick<SortTableHeadProps<SoldSortOptions>, 'options'>);

export const SOLD_SORT_OPTIONS = [
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

export type SoldSortOptions = (typeof SOLD_SORT_OPTIONS)[number];

type SoldSortProps = {
  ids: string[];
  items: Record<string, Sold>;
};

type SoldSortFunction = DeepSortFunction<string, SoldSortProps>;

export type SoldExtractFunction<V extends string | number> = ExtractFunction<
  SoldSortProps,
  string,
  V
>;

export const SOLD_SORT_OPTIONS_FUNCTIONS: Record<
  SoldSortOptions,
  SoldSortFunction
> = {
  '': ({ ids }) => ids,
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
    Component: SortTableHead,
    options: {
      asc: 'id asc',
      desc: 'id desc',
    },
  },
  {
    id: '2',
    label: 'Stock Name',
    fixedWidth: 120,
    Component: SortTableHead,
    options: {
      asc: 'stockName asc',
      desc: 'stockName desc',
    },
  },
  {
    id: '3',
    label: 'Tag',
    fixedWidth: 70,
    Component: SortTableHead,
    options: {
      asc: 'tag asc',
      desc: 'tag desc',
    },
  },
  {
    id: '4',
    label: 'Quantity',
    minWidth: 50,
    Component: SortTableHead,
    options: {
      asc: 'buyQuantity asc',
      desc: 'buyQuantity desc',
    },
  },
  {
    id: '5',
    label: 'Buy Date',
    fixedWidth: 200,
    Component: SortTableHead,
    options: {
      asc: 'buyDate asc',
      desc: 'buyDate desc',
    },
  },
  {
    id: '6',
    label: 'Buy Unit Price',
    minWidth: 120,
    Component: SortTableHead,
    options: {
      asc: 'buyUnitPrice asc',
      desc: 'buyUnitPrice desc',
    },
  },
  {
    id: '7',
    label: 'Buy Total Cost',
    minWidth: 120,
    Component: SortTableHead,
    options: {
      asc: 'buyTotalCost asc',
      desc: 'buyTotalCost desc',
    },
  },
  {
    id: '8',
    label: 'Sold Date',
    fixedWidth: 230,
    Component: SortTableHead,
    options: {
      asc: 'soldDate asc',
      desc: 'soldDate desc',
    },
  },
  {
    id: '9',
    label: 'Sold Unit Price',
    minWidth: 120,
    Component: SortTableHead,
    options: {
      asc: 'soldUnitPrice asc',
      desc: 'soldUnitPrice desc',
    },
  },
  {
    id: '10',
    label: 'Total Sold Value',
    minWidth: 120,
    Component: SortTableHead,
    options: {
      asc: 'soldTotalValue asc',
      desc: 'soldTotalValue desc',
    },
  },
  {
    id: '11',
    label: 'Return',
    minWidth: 100,
    Component: SortTableHead,
    options: {
      asc: 'return asc',
      desc: 'return desc',
    },
  },
  {
    id: '12',
    label: 'ROI (%)',
    minWidth: 100,
    Component: SortTableHead,
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
