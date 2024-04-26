export const getAverage = (numerator: number, denominator: number): number =>
  denominator ? numerator / denominator : 0;

export const getPercentage = (numerator: number, denominator: number): number =>
  getAverage(numerator, denominator) * 100;

export const fixedAsNumber = (
  num: number,
  fractionDigits: number = 2,
): number => Number(num.toFixed(fractionDigits));
