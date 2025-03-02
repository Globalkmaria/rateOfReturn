import { localStringToNumber } from '@/utils';

import { PortfolioAllocationExtractFunction } from './const';

export const allocationSortDefault = ({ ids }: { ids: string[] }) => ids;

export const getAllocationName: PortfolioAllocationExtractFunction<string> = (
  { items },
  id,
) => items.stockIdAndNamePairs[id];

export const getAllocationCurrentPrice: PortfolioAllocationExtractFunction<
  number
> = ({ items }, id) => localStringToNumber(items.currentPrice[id].totalPrice);

export const getAllocationBuyPrice: PortfolioAllocationExtractFunction<
  number
> = ({ items }, id) => localStringToNumber(items.buyPrice[id].totalPrice);
