import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { StockMainInfo } from '../../../../../features/stockList/type';
import { updateStock } from '../../../../../features/stockList/stockListSlice';
import { EditUserStockServiceData } from '../../../../../service/userStocks/type';
import { TransformedValue } from '../../../../../components/Input/BaseInput';

export type ChangedSummaryInputs = EditUserStockServiceData;

export const useStockSummaryInputChange = (stockId: string) => {
  const dispatch = useDispatch();
  const [changedInputs, setChangedInputs] = useState<ChangedSummaryInputs>({});
  const initChangedInputs = useCallback(() => setChangedInputs({}), []);

  const onInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      transformedValue: TransformedValue,
    ) => {
      const fieldName = e.target.name as keyof Omit<StockMainInfo, 'stockId'>;
      if (fieldName === 'currentPrice' && transformedValue === null) return;

      const value =
        fieldName === 'stockName'
          ? e.target.value
          : (transformedValue && transformedValue[1]) ||
            e.target.value.replaceAll(',', '');

      setChangedInputs((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      dispatch(
        updateStock({
          stockId: stockId,
          fieldName: fieldName,
          value,
        }),
      );
    },
    [stockId, dispatch],
  );

  return {
    changedInputs,
    initChangedInputs,
    onInputChange,
  };
};
