import { z } from 'zod';

import {
  alertAndReturnValue,
  getDecimalPlacesSchema,
} from '@/utils/validation';

import { PurchasedItemInfo } from '../../../features/stockList/type';

export type ValidityResult = { message?: string; isValid: boolean };
type FieldType = keyof typeof schema;

const stockNameSchema = z
  .string()
  .max(40, { message: 'Stock name must be at most 40 characters long' });

const stockPriceSchema = z
  .number()
  .min(0, {
    message: 'Stock price must be bigger than 0',
  })
  .max(9999999.9999, {
    message: 'Stock price must be smaller than 9,999,999.9999',
  });
const decimalPlacesSchema = getDecimalPlacesSchema(4);
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

export const checkStockValidity = (
  type: FieldType,
  value: string | number,
): ValidityResult => {
  const result = schema[type].safeParse(value);
  return {
    isValid: result.success,
    message: result.success ? '' : result.error.issues[0].message,
  };
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
  return checkStockValidity(field, formattedValue);
};

const PURCHASED_ITEM_FIELD_PAIRS: Partial<
  Record<keyof PurchasedItemInfo, FieldType>
> = {
  purchasedQuantity: 'quantity',
  purchasedPrice: 'price',
};

export const checkCurrentPrice = (StringValue: string) => {
  const value = Number(StringValue);
  const isValidDecimal = decimalPlacesSchema.safeParse(value);
  if (!isValidDecimal.success) {
    alert(isValidDecimal.error.issues[0].message);
    return false;
  }

  return alertAndReturnValue(checkStockValidity('price', value));
};

export const checkStockName = (value: string) =>
  alertAndReturnValue(checkStockValidity('name', value));

export const checkQuantity = (value: string) =>
  alertAndReturnValue(checkStockValidity('quantity', Number(value)));
