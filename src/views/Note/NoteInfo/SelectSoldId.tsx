import { useSelector } from 'react-redux';

import { selectSoldList } from '@/features/solds';

import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import Icon from '@/components/Icon';

import { StyledField, StyledName } from './components';
import { NoteFormOnChange } from './type';

interface SelectSoldIdProps {
  soldId: string | null;
  onChange: NoteFormOnChange;
}

function SelectSoldId({ soldId, onChange }: SelectSoldIdProps) {
  const soldList = useSelector(selectSoldList);
  const soldIds = soldList.allIds;

  const onOptionSelect = (newOption: string | null) =>
    onChange('soldId', newOption);

  const dropboxSettings: TagDropbox2Settings<(typeof soldIds)[number]> = {
    options: soldIds,
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
