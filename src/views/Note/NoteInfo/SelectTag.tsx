import { useDispatch, useSelector } from 'react-redux';

import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import { selectStockTags } from '@/features/stockList/selectors';
import {
  addStockTag,
  deleteStockTag,
} from '@/features/stockList/stockListSlice';

import { StyledField, StyledName } from './components';
import { NoteFormOnChange } from './type';

interface SelectTagProps {
  tag: string | null;
  onChange: NoteFormOnChange;
}

function SelectTag({ tag, onChange }: SelectTagProps) {
  const dispatch = useDispatch();
  const options = useSelector(selectStockTags);

  const onOptionSelect = (newOption: string | null) =>
    onChange('tag', newOption);

  const onDeleteOption = (option: string) => {
    dispatch(deleteStockTag(option));

    if (option === option) onOptionSelect(null);
  };

  const onCreateNewOption = async (newOption: string) => {
    dispatch(addStockTag(newOption));
    onOptionSelect(newOption);
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
        selectedOption={tag}
      />
    </StyledField>
  );
}

export default SelectTag;
