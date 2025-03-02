import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import userStocksService from '@/service/userStocks/userStocks';

import { selectStockTags } from '@/features/stockList/selectors';
import {
  addStockTag,
  deleteStockTag,
} from '@/features/stockList/stockListSlice';
import { selectIsLoggedIn } from '@/features/user/selectors';

import { TableCell } from '@/components/table/Table';
import Tag from '@/components/Tag';

interface Props {
  disabled: boolean;
  selectedOption?: string;
  onTagChange: (option: string) => void;
}

function StockTag({ disabled, onTagChange, selectedOption }: Props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const options = useSelector(selectStockTags);

  const createNewOption = async (option: string) => {
    if (isLoggedIn) {
      const result = await userStocksService.addStockTag(option);

      if (!result.success) {
        alert(result.message);
        return;
      }
    }
    dispatch(addStockTag(option));
  };

  const deleteOption = async (option: string) => {
    if (isLoggedIn) {
      const result = await userStocksService.deleteStockTag(option);

      if (!result.success) {
        alert(result.message);
        return;
      }
    }

    dispatch(deleteStockTag(option));

    if (selectedOption === option) {
      onTagChange('');
    }
  };

  return (
    <TableCell>
      <Tag
        dropboxSettings={{ height: 170 }}
        height={29}
        disabled={disabled}
        options={options}
        onCreateNewOption={createNewOption}
        onDeleteOption={deleteOption}
        onOptionSelect={onTagChange}
        selectedOption={selectedOption}
      />
    </TableCell>
  );
}

export default memo(StockTag);
