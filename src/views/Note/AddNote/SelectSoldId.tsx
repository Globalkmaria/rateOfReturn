import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectSoldList } from '@/features/solds';

import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import { StyledField, StyledName } from './components';

function SelectSoldId() {
  const soldList = useSelector(selectSoldList);
  const soldIds = soldList.allIds;
  const [option, setOption] = useState<null | string>(null);

  const onOptionSelect = (newOption: string | null) => setOption(newOption);

  const dropboxSettings: TagDropbox2Settings<(typeof soldIds)[number]> = {
    options: soldIds,
    onOptionSelect,
    placeholder: 'Search for a sold id...',
    subtitle: 'Select a sold id',
    height: 200,
  };
  return (
    <StyledField>
      <StyledName>Sold id</StyledName>
      <Tag2
        chipColor='indigo100'
        chipTextColor='indigo700'
        height={40}
        dropboxSettings={dropboxSettings}
        selectedOption={option}
      />
    </StyledField>
  );
}

export default SelectSoldId;
