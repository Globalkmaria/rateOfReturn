import { z } from 'zod';
import { PurchasedItemInfo, StockMainInfo } from '../../../features/stockList/type';

export type ValidityResult = { message?: string; isValid: boolean };
type FieldType = keyof typeof schema;

const stockNameSchema = z.string().max(12, { message: 'Stock name must be at most 12 characters long' });
const stockPriceSchema = z.string().max(10, { message: 'Stock price must be at most 10 characters long' });
const stockQuantitySchema = z.string().max(9, { message: 'Stock quantity must be at most 9 characters long' });

const schema = {
  name: stockNameSchema,
  price: stockPriceSchema,
  quantity: stockQuantitySchema,
};

const checkValidity = (type: FieldType, value: string): ValidityResult => {
  const result = schema[type].safeParse(value);
  return {
    isValid: result.success,
    message: result.success ? '' : result.error.issues[0].message,
  };
};

export const checkStockValidity = (type: keyof Omit<StockMainInfo, 'stockId'>, value: string): ValidityResult => {
  const field = STOCK_FIELD_PAIRS[type];
  if (!field) return { isValid: true, message: '' };

  return checkValidity(field, value);
};

const STOCK_FIELD_PAIRS: Record<keyof Omit<StockMainInfo, 'stockId'>, FieldType> = {
  stockName: 'name',
  currentPrice: 'price',
};

export const checkPurchasedItemValidity = (type: keyof PurchasedItemInfo, value: string): ValidityResult => {
  const field = PURCHASED_ITEM_FIELD_PAIRS[type];
  if (!field) return { isValid: true, message: '' };

  return checkValidity(field, value);
};

const PURCHASED_ITEM_FIELD_PAIRS: Partial<Record<keyof PurchasedItemInfo, FieldType>> = {
  purchasedQuantity: 'quantity',
  purchasedPrice: 'price',
};
