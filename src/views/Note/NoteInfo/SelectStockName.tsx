import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import { TagOption } from '@/components/Tag2/Tag2Option';
import Icon from '@/components/Icon';

import { StyledField, StyledName } from './components';
import { NoteFormOnChange } from './type';

interface SelectStockNameProps {
  stockNameOptionList: TagOption[];
  stockName: TagOption | null;
  onChange: NoteFormOnChange;
}

function SelectStockName({
  stockNameOptionList,
  onChange,
  stockName,
}: SelectStockNameProps) {
  const dropboxSettings: TagDropbox2Settings<TagOption> = {
    options: stockNameOptionList,
    onOptionSelect: option => onChange('stockName', option ? option : null),
    subtitle: 'Select a stock name',
    placeholder: 'Search for a stock name...',
    height: 200,
    showCreateNewOption: false,
  };

  return (
    <StyledField>
      <StyledName>
        <Icon icon='abc' color='grey600' />
        Stock name
      </StyledName>
      <Tag2
        height={40}
        selectedOption={stockName}
        showCreateNewOption={false}
        dropboxSettings={dropboxSettings}
        chipColor={'red100'}
        chipTextColor={'red700'}
      />
    </StyledField>
  );
}

export default SelectStockName;
