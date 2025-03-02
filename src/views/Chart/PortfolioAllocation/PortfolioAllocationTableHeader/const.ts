import {
  createNumericSortFunction,
  createStringSortFunction,
  DeepSortFunction,
  ExtractFunction,
} from '@/components/table/sort/utils';

import { StockAllocationInfo } from '../utils';
import {
  allocationSortDefault,
  getAllocationBuyPrice,
  getAllocationCurrentPrice,
  getAllocationName,
} from './helper';

export const PORTFOLIO_ALLOCATION_SORT_OPTIONS = [
  '',
  'name asc',
  'name desc',
  'buyPrice asc',
  'buyPrice desc',
  'currentPrice asc',
  'currentPrice desc',
] as const;

export type PortfolioAllocationSortOptions =
  (typeof PORTFOLIO_ALLOCATION_SORT_OPTIONS)[number];

type PortfolioAllocationSortProps = {
  ids: string[];
  items: StockAllocationInfo;
};
type PortfolioAllocationSortFunction = DeepSortFunction<
  string,
  PortfolioAllocationSortProps
>;

export type PortfolioAllocationExtractFunction<V extends string | number> =
  ExtractFunction<PortfolioAllocationSortProps, string, V>;

export const PORTFOLIO_ALLOCATION_SORT_OPTIONS_FUNCTIONS: Record<
  PortfolioAllocationSortOptions,
  PortfolioAllocationSortFunction
> = {
  '': allocationSortDefault,
  'name asc': createStringSortFunction(getAllocationName, true),
  'name desc': createStringSortFunction(getAllocationName, false),
  'currentPrice asc': createNumericSortFunction(
    getAllocationCurrentPrice,
    true,
  ),
  'currentPrice desc': createNumericSortFunction(
    getAllocationCurrentPrice,
    false,
  ),
  'buyPrice asc': createNumericSortFunction(getAllocationBuyPrice, true),
  'buyPrice desc': createNumericSortFunction(getAllocationBuyPrice, false),
};
