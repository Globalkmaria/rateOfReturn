export const generateDataEntry = <
  D1 extends Record<string, unknown>,
  D2 extends Record<string, unknown>,
>(
  sourceData: D1,
) => {
  return (
    sourceKey: keyof D1,
    targetKey: keyof D2,
    valueTransformer?: (value: D1[keyof D1]) => D2[keyof D2],
  ) =>
    sourceData[sourceKey] !== undefined
      ? {
          [targetKey]: valueTransformer
            ? valueTransformer(sourceData[sourceKey])
            : sourceData[sourceKey],
        }
      : {};
};
