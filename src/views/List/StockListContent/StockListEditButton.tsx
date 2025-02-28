import { useDispatch, useSelector } from 'react-redux';

import { updateStockList } from '@/features/stockList/stockListSlice';
import { selectTemporalStockList } from '@/features/temporalStockList/selectors';
import {
  resetTemporalStockList,
  updateTemporalStockListEditMode,
} from '@/features/temporalStockList/temporalStockListSlice';

import { EditButton } from '@/components/IconButton';

function StockListEditButton() {
  const dispatch = useDispatch();
  const temporalStockList = useSelector(selectTemporalStockList);

  const toggleLock = async () => {
    if (!temporalStockList.isEditMode) {
      dispatch(updateTemporalStockListEditMode(true));
    } else {
      // TODO login logic
      dispatch(updateStockList(temporalStockList.stockList));
      dispatch(updateTemporalStockListEditMode(false));
      dispatch(resetTemporalStockList());
    }
  };

  return (
    <EditButton isLock={temporalStockList.isEditMode} onClick={toggleLock} />
  );
}

export default StockListEditButton;

// const logInSaveStock = async () => {
//   //stock
//   const result = await userStocksService.editUserStock({
//     stockId,
//     data: getEditUserStockData(changedInputs, mainInfo),
//   });

//   // purchased
//   const result = await userStocksService.editUserItem({
//     stockId,
//     itemId: purchasedId,
//     data: changedInputs,
//   });

//   if (!result.success) return alert(result.message);
// };
