import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import { selectStockTags } from '@/features/stockList/selectors';
import { StyledField, StyledName } from './components';
import {
  addStockTag,
  deleteStockTag,
} from '@/features/stockList/stockListSlice';

function SelectTag() {
  const dispatch = useDispatch();
  const options = useSelector(selectStockTags);
  const [option, setOption] = useState<null | string>(null);

  const onOptionSelect = (newOption: string | null) => setOption(newOption);
  const onDeleteOption = (option: string) => {
    dispatch(deleteStockTag(option));

    if (option === option) setOption(null);
  };
  const onCreateNewOption = async (newOption: string) => {
    dispatch(addStockTag(newOption));
    setOption(newOption);
  };

  const dropboxSettings: TagDropbox2Settings<(typeof options)[number]> = {
    options,
    onOptionSelect,
    onDeleteOption,
    showDeleteItem: true,
    placeholder: 'Search for a tag...',
    subtitle: 'Select a tag or create one',
    onCreateNewOption,
    height: 200,
  };
  return (
    <StyledField>
      <StyledName>Tag</StyledName>
      <Tag2
        chipColor='brown100'
        chipTextColor='brown700'
        height={40}
        dropboxSettings={dropboxSettings}
        selectedOption={option}
      />
    </StyledField>
  );
}

export default SelectTag;
