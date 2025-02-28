import { StockMainInfo } from '@/features/stockList/type';

import { TransformedValue } from '@/components/Input/BaseInput';

export const getNameAndValue = (
  e: React.ChangeEvent<HTMLInputElement>,
  transformedValue: TransformedValue,
) => {
  const fieldName = e.target.name as keyof StockMainInfo;
  if (transformedValue === null) return;

  const value = Array.isArray(transformedValue)
    ? transformedValue[0]
    : transformedValue;

  return { name: fieldName, value };
};
