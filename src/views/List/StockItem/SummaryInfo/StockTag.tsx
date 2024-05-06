import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TableCell } from '@/components/Table';
import Tag from '@/components/Tag';
import { selectStockTags } from '@/features/stockList/selectors';
import {
  addStockTag,
  deleteStockTag,
} from '@/features/stockList/stockListSlice';

interface Props {
  disabled: boolean;
  selectedOption?: string;
  onTagChange: (option: string) => void;
}

function StockTag({ disabled, onTagChange, selectedOption }: Props) {
  const dispatch = useDispatch();
  const options = useSelector(selectStockTags);

  const createNewOption = async (option: string) => {
    dispatch(addStockTag(option));
  };

  const deleteOption = async (option: string) => {
    dispatch(deleteStockTag(option));

    if (selectedOption === option) {
      onTagChange('');
    }
  };

  return (
    <TableCell>
      <Tag
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
