import { useSelector } from 'react-redux';

import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import { selectStockTags } from '@/features/stockList/selectors';
import Icon from '@/components/Icon';

import { StyledField, StyledName } from './components';
import { NoteFormOnChange } from './type';
import { getTagOptionList } from '../helper';
import { selectNotes } from '@/features/notes';
import { selectSoldList } from '@/features/solds';

interface SelectTagProps {
  tag: string | null;
  onChange: NoteFormOnChange;
}

function SelectTag({ tag, onChange }: SelectTagProps) {
  const tags = useSelector(selectStockTags);
  const notes = useSelector(selectNotes);
  const sold = useSelector(selectSoldList);

  const onOptionSelect = (newOption: string | null) =>
    onChange('tag', newOption);

  const options = getTagOptionList(tags, notes.collection, sold);

  const dropboxSettings: TagDropbox2Settings<string> = {
    options,
    onOptionSelect,
    placeholder: 'Search for a tag...',
    subtitle: 'Select a tag',
    height: 200,
    showCreateNewOption: false,
  };
  return (
    <StyledField>
      <StyledName>
        <Icon icon='tag2' color='grey600' />
        Tag
      </StyledName>
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
