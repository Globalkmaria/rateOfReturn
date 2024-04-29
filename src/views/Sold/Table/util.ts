import { getDecimalPlacesSchema } from '@/utils/validation';
import { z } from 'zod';

const soldPriceSchema = z
  .number()
  .min(0, { message: 'Stock price must be bigger than 0' })
  .max(9999999.9999, {
    message: 'Stock price must be smaller than 9,999,999.9999',
  });

const decimalPlacesSchema = getDecimalPlacesSchema(4);

export const checkSoldPriceValidity = (value: string) => {
  const formattedValue = Number(value.replace(/,/g, ''));
  let result = decimalPlacesSchema.safeParse(formattedValue);
  if (result.success) {
    result = soldPriceSchema.safeParse(formattedValue);
  }

  return {
    isValid: result.success,
    message: result.success ? '' : result.error.issues[0].message,
  };
};
