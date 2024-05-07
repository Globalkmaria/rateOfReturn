import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { StockMainInfo } from '../../../../../features/stockList/type';
import { EditUserStockServiceData } from '../../../../../service/userStocks/type';
import { TransformedValue } from '../../../../../components/Input/BaseInput';
import { checkStockValidity } from '../../validity';

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
      const fieldName = e.target.name as keyof Omit<
        StockMainInfo,
        'stockId' | 'needInit'
      >;
      if (fieldName === 'currentPrice' && transformedValue === null) return;

      const value =
        fieldName === 'stockName'
          ? e.target.value
          : (transformedValue && transformedValue[1]) ||
            e.target.value.replaceAll(',', '');

      const validity = checkStockValidity(fieldName, value);
      if (!validity.isValid) return alert(validity.message);

      setChangedInputs(prev => ({ ...prev, [fieldName]: value }));
    },
    [stockId, dispatch],
  );

  const onTagChange = useCallback(
    (option: string) => setChangedInputs(prev => ({ ...prev, tag: option })),
    [],
  );

  return {
    changedInputs,
    initChangedInputs,
    onInputChange,
    onTagChange,
  };
};
