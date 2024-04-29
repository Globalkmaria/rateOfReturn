import { z } from 'zod';
import {
  PurchasedItemInfo,
  StockMainInfo,
} from '../../../features/stockList/type';

export type ValidityResult = { message?: string; isValid: boolean };
type FieldType = keyof typeof schema;

const stockNameSchema = z
  .string()
  .max(12, { message: 'Stock name must be at most 12 characters long' });

const stockPriceSchema = z
  .number()
  .min(0, {
    message: 'Stock price must be bigger than 0',
  })
  .max(9999999.9999, {
    message: 'Stock price must be smaller than 9,999,999.9999',
  });
const decimalPlacesSchema = z.number().refine(
  n => {
    return (n.toString().split('.')[1] || '').length <= 4;
  },
  { message: 'Max precision is 4 decimal places' },
);
const stockQuantitySchema = z
  .number()
  .min(0, { message: 'Stock price must be bigger than 0' })
  .max(9999999, { message: 'Stock price must be smaller than 9,999,999' })
  .int();

const schema = {
  name: stockNameSchema,
  price: stockPriceSchema,
  quantity: stockQuantitySchema,
};

const checkValidity = (
  type: FieldType,
  value: string | number,
): ValidityResult => {
  const result = schema[type].safeParse(value);
  return {
    isValid: result.success,
    message: result.success ? '' : result.error.issues[0].message,
  };
};

export const checkStockValidity = (
  type: keyof Omit<StockMainInfo, 'stockId' | 'needInit'>,
  value: string,
): ValidityResult => {
  const field = STOCK_FIELD_PAIRS[type];
  if (!field) return { isValid: true, message: '' };

  if (type === 'stockName') return checkValidity(field, value);

  const formattedValue = Number(value.replace(/,/g, ''));
  if (type === 'currentPrice') {
    const result = decimalPlacesSchema.safeParse(formattedValue);
    if (!result.success) {
      return {
        isValid: false,
        message: result.error.issues[0].message,
      };
    }
  }
  return checkValidity(field, formattedValue);
};

const STOCK_FIELD_PAIRS: Record<
  keyof Omit<StockMainInfo, 'stockId' | 'needInit'>,
  FieldType
> = {
  stockName: 'name',
  currentPrice: 'price',
};

export const checkPurchasedItemValidity = (
  type: keyof PurchasedItemInfo,
  value: string,
): ValidityResult => {
  const field = PURCHASED_ITEM_FIELD_PAIRS[type];
  if (!field) return { isValid: true, message: '' };

  const formattedValue = Number(value.replace(/,/g, ''));
  if (type === 'purchasedPrice') {
    const result = decimalPlacesSchema.safeParse(formattedValue);
    if (!result.success) {
      return {
        isValid: false,
        message: result.error.issues[0].message,
      };
    }
  }
  return checkValidity(field, formattedValue);
};

const PURCHASED_ITEM_FIELD_PAIRS: Partial<
  Record<keyof PurchasedItemInfo, FieldType>
> = {
  purchasedQuantity: 'quantity',
  purchasedPrice: 'price',
};
