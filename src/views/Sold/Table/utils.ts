import { z } from 'zod';

import {
  alertAndReturnValueZod,
  getDecimalPlacesSchema,
} from '@/utils/validation';

import { getPercentage, localStringToNumber } from '@/utils';

import { SoldExtractFunction } from './const';

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

export const getId: SoldExtractFunction<number> = (sortProps, id) => Number(id);

export const getStockName: SoldExtractFunction<string> = ({ items }, id) =>
  items[id].stockName;

export const getTag: SoldExtractFunction<string> = ({ items }, id) =>
  items[id]?.tag ?? '';

export const getBuyQuantity: SoldExtractFunction<number> = ({ items }, id) =>
  items[id].purchasedQuantity;

export const getBuyTime: SoldExtractFunction<number> = ({ items }, id) =>
  getMilliseconds(items[id].purchasedDate, items[id].purchasedTime);

export const getBuyPrice: SoldExtractFunction<number> = ({ items }, id) =>
  items[id].purchasedPrice;

export const getBuyTotal: SoldExtractFunction<number> = (...props) =>
  getBuyQuantity(...props) * getBuyPrice(...props);

export const getSoldTime: SoldExtractFunction<number> = ({ items }, id) =>
  getMilliseconds(items[id].soldDate, items[id].soldTime);

export const getSoldPrice: SoldExtractFunction<number> = ({ items }, id) =>
  localStringToNumber(items[id].soldPrice);

export const getSoldTotal: SoldExtractFunction<number> = (...props) =>
  getBuyQuantity(...props) * getSoldPrice(...props);

export const getProfit: SoldExtractFunction<number> = (...props) =>
  (getSoldPrice(...props) - getBuyPrice(...props)) * getBuyQuantity(...props);

export const getReturnRatio: SoldExtractFunction<number> = (...props) =>
  getPercentage(getProfit(...props), getBuyPrice(...props));
