import { z } from 'zod';

import {
  alertAndReturnValueZod,
  getDecimalPlacesSchema,
} from '@/utils/validation';

import { Sold, SoldsState } from '@/features/solds';

import { getPercentage, localStringToNumber } from '@/utils';

import { SortFunction } from './const';

const soldPriceSchema = z
  .number()
  .min(0, { message: 'Stock price must be bigger than 0' })
  .max(9999999.9999, {
    message: 'Stock price must be smaller than 9,999,999.9999',
  });

const decimalPlacesSchema = getDecimalPlacesSchema(4);

export const checkSoldPrice = (stringValue: string) => {
  const value = Number(stringValue);
  const isValidDecimal = decimalPlacesSchema.safeParse(value);
  if (!isValidDecimal.success) {
    alert(isValidDecimal.error.issues[0].message);
    return false;
  }
  return alertAndReturnValueZod(soldPriceSchema.safeParse(value));
};

export const getMilliseconds = (date: string, time: string) => {
  return new Date(`${date} ${time}`).getTime();
};

// SORT FUNCTIONS

export const getSortedIdsCopy = <T>(
  list: SoldsState['list'],
  extractSortValue: (item: Sold) => T,
  compareValues: (a: T, b: T) => number,
) =>
  list.allIds.toSorted((a, b) =>
    compareValues(
      extractSortValue(list.byId[a]),
      extractSortValue(list.byId[b]),
    ),
  );

export const createNumericSortFunction =
  (getter: (item: Sold) => number, ascending: boolean): SortFunction =>
  list =>
    getSortedIdsCopy(list, getter, (a, b) => (ascending ? a - b : b - a));

export const createStringSortFunction =
  (getter: (item: Sold) => string, ascending: boolean): SortFunction =>
  list =>
    getSortedIdsCopy(list, getter, (a, b) =>
      ascending ? a.localeCompare(b) : b.localeCompare(a),
    );

export const getId = (item: Sold) => Number(item.id);

export const getStockName = (item: Sold) => item.stockName;

export const getTag = (item: Sold) => item?.tag ?? '';

export const getBuyQuantity = (item: Sold) => item.purchasedQuantity;

export const getBuyTime = (item: Sold) =>
  getMilliseconds(item.purchasedDate, item.purchasedTime);

export const getBuyPrice = (item: Sold) => item.purchasedPrice;

export const getBuyTotal = (item: Sold) =>
  getBuyQuantity(item) * getBuyPrice(item);

export const getSoldTime = (item: Sold) =>
  getMilliseconds(item.soldDate, item.soldTime);

export const getSoldPrice = (item: Sold) => localStringToNumber(item.soldPrice);

export const getSoldTotal = (item: Sold) =>
  getBuyQuantity(item) * getSoldPrice(item);

export const getProfit = (item: Sold) =>
  (getSoldPrice(item) - getBuyPrice(item)) * getBuyQuantity(item);

export const getReturnRatio = (item: Sold) =>
  getPercentage(getProfit(item), getBuyPrice(item));
