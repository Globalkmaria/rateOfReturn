export const generateDataEntry = <
  D1 extends Record<string, any>,
  D2 extends Record<string, any>,
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
