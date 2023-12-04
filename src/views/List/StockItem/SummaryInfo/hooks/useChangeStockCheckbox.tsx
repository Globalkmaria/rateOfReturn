import { useDispatch } from 'react-redux';
import { updateCheckedItems } from '../../../../../features/checkedItems/checkedItemsSlice';
import { useCallback } from 'react';

const useChangeStockCheckbox = (stockId: string) => {
  const dispatch = useDispatch();

  const onChangeCheckbox = useCallback(
    (value: boolean) => {
      dispatch(
        updateCheckedItems({
          type: 'stock',
          checked: value,
          stockId: stockId,
        }),
      );
    },
    [dispatch, stockId],
  );
  return onChangeCheckbox;
};

export default useChangeStockCheckbox;
