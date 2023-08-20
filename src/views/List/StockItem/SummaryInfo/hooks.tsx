import { useDispatch, useSelector } from 'react-redux';
import { DeleteModalProps } from '../DeleteStockModal';
import { openStockModal } from '../../../../features/stockModal/stockModalSlice';
import { TransformedValue } from '../../../../components/Input';
import { StockMainInfo } from '../../../../features/stockList/type';
import { updateStock } from '../../../../features/stockList/stockListSlice';
import { updateCheckedItems } from '../../../../features/checkedItems/checkedItemsSlice';
import {
  selectIsMainGroupSelected,
  selectSelectedGroupInfo,
} from '../../../../features/groups/selectors';
import { selectStockInfoById } from '../../../../features/stockList/selectors';
import { getGroupPurchasedData, getStockSummaryInfo } from '../utils';
import { useState } from 'react';
import { EditUserStockServiceData } from '../../../../service/userStocks/type';

export const useStockDeleteModalOpen = (stockId: string) => {
  const dispatch = useDispatch();
  const onDeleteModalOpen = () => {
    const props: DeleteModalProps = {
      stockId,
      purchasedId: '',
      type: 'stock',
    };

    dispatch(
      openStockModal({
        modalName: 'DeleteStockModal',
        props,
      }),
    );
  };

  return onDeleteModalOpen;
};

type ChangedInputs = EditUserStockServiceData;

export const useStockSummaryInputChange = (stockId: string) => {
  const dispatch = useDispatch();
  const [changedInputs, setChangedInputs] = useState<ChangedInputs>({});
  const initChangedInputs = () => setChangedInputs({});

  const onInputChange = (
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
  };

  return { changedInputs, initChangedInputs, onInputChange };
};

export const useChangeStockCheckbox = (stockId: string) => {
  const dispatch = useDispatch();
  const onChangeCheckbox = (value: boolean) => {
    dispatch(
      updateCheckedItems({
        type: 'stock',
        checked: value,
        stockId: stockId,
      }),
    );
  };
  return onChangeCheckbox;
};

export const useGetStockSummaryData = (stockId: string) => {
  const isMainGroupSelected = useSelector(selectIsMainGroupSelected());
  const stockInfo = useSelector(selectStockInfoById(stockId));
  const groupInfo = useSelector(selectSelectedGroupInfo());
  const groupPurchasedIds = groupInfo.stocks.byId[stockId];

  const purchasedItems = isMainGroupSelected
    ? stockInfo.purchasedItems
    : getGroupPurchasedData(stockInfo.purchasedItems, groupPurchasedIds);
  const summaryData = getStockSummaryInfo(stockInfo.mainInfo, purchasedItems);

  return {
    ...summaryData,
    evaluationProfit: summaryData.evaluationProfit.toLocaleString(),
    profitRate: `${summaryData.profitRate.toFixed(2).toLocaleString()} %`,
  };
};
