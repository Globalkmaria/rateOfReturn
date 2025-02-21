import { ValidityResult } from '@/views/List/StockItem/validity';
import { z } from 'zod';

export const getDecimalPlacesSchema = (places: number) =>
  z.number().refine(
    n => {
      return (n.toString().split('.')[1] || '').length <= places;
    },
    { message: `Max precision is ${places} decimal places` },
  );

export const alertAndReturnValue = (result: ValidityResult) => {
  if (!result.isValid) alert(result.message);
  return result.isValid;
};

export const alertAndReturnValueZod = <T, V>(
  result: z.SafeParseReturnType<T, V>,
) => {
  if (!result.success) alert(result.error.issues[0].message);

  return result.success;
};

export const isDefined = (value: unknown) =>
  value !== null && value !== undefined;
