import {
  alertAndReturnValueZod,
  getDecimalPlacesSchema,
} from '@/utils/validation';
import { z } from 'zod';

const soldPriceSchema = z
  .number()
  .min(0, { message: 'Stock price must be bigger than 0' })
  .max(9999999.9999, {
    message: 'Stock price must be smaller than 9,999,999.9999',
  });

const decimalPlacesSchema = getDecimalPlacesSchema(4);

export const checkSoldPrice = (value: number) => {
  const isValidDecimal = decimalPlacesSchema.safeParse(value);
  if (!isValidDecimal.success) {
    alert(isValidDecimal.error.issues[0].message);
    return false;
  }
  return alertAndReturnValueZod(soldPriceSchema.safeParse(value));
};
