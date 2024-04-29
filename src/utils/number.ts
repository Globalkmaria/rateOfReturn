export const getAverage = (numerator: number, denominator: number): number =>
  denominator ? numerator / denominator : 0;

export const getPercentage = (numerator: number, denominator: number): number =>
  getAverage(numerator, denominator) * 100;

export const fixedAsNumber = (
  num: number,
  fractionDigits: number = 2,
): number => Number(num.toFixed(fractionDigits));

export const getFixedLocaleString = (
  num: string | number,
  fractionDigits: number = 4,
): string => {
  if (typeof num === 'string') {
    num = num.replace(/,/g, '');
  }

  const localString = Number(num).toString();
  const [integer, decimal] = localString.split('.');
  const fixedDecimal = decimal?.length
    ? decimal.length < fractionDigits
      ? decimal.padEnd(fractionDigits, '0')
      : decimal
    : '0000';
  return `${Number(integer).toLocaleString()}.${fixedDecimal}`;
};
