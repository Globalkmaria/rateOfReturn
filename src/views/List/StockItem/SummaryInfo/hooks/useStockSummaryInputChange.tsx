import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { TransformedValue } from '../../../../../components/Input/BaseInput';
import { EditUserStockServiceData } from '../../../../../service/userStocks/type';

export type ChangedSummaryInputs = Omit<
  EditUserStockServiceData,
  'currentPrice'
> & {
  currentPrice?: string;
};

export const useStockSummaryInputChange = (stockId: string) => {
  const dispatch = useDispatch();
  const [changedInputs, setChangedInputs] = useState<ChangedSummaryInputs>({});
  const initChangedInputs = useCallback(() => setChangedInputs({}), []);

  const onInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      transformedValue: TransformedValue,
    ) => {
      const fieldName = e.target.name as keyof ChangedSummaryInputs;
      if (transformedValue === null) return;

      let value = transformedValue;
      if (fieldName === 'currentPrice') {
        value = transformedValue[0];
      }

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
