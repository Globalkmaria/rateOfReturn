import { useSelector } from 'react-redux';

import { selectNoteCollection } from '@/features/notes';
import { selectSoldList } from '@/features/solds';

import Icon from '@/components/Icon';
import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';

import { StyledField, StyledName } from './components';
import { NoteFormOnChange } from './type';
import { getSoldIdOptionList } from '../helper';

interface SelectSoldIdProps {
  soldId: string | null;
  onChange: NoteFormOnChange;
}

function SelectSoldId({ soldId, onChange }: SelectSoldIdProps) {
  const solds = useSelector(selectSoldList);
  const notes = useSelector(selectNoteCollection);

  const options = getSoldIdOptionList(solds.allIds, notes);

  const onOptionSelect = (newOption: string | null) =>
    onChange('soldId', newOption);

  const dropboxSettings: TagDropbox2Settings<string> = {
    options,
    onOptionSelect,
    placeholder: 'Search for a sold id...',
    subtitle: 'Select a sold id',
    height: 200,
    showCreateNewOption: false,
  };

  return (
    <StyledField>
      <StyledName>
        <Icon icon='tag1' color='grey600' />
        Sold id
      </StyledName>
      <Tag2
        chipColor='indigo100'
        chipTextColor='indigo700'
        height={40}
        dropboxSettings={dropboxSettings}
        selectedOption={soldId}
      />
    </StyledField>
  );
}

export default SelectSoldId;
