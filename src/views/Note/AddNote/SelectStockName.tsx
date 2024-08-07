import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import { StyledField, StyledName } from './components';
import { TagOption } from '@/components/Tag2/Tag2Option';

type SelectStockNameProps = {
  stockNameOptionList: TagOption[];
  stockNameOption: TagOption | null;
  onStockNameSelect: (option: TagOption | null) => void;
};

function SelectStockName({
  stockNameOptionList,
  stockNameOption,
  onStockNameSelect,
}: SelectStockNameProps) {
  const dropboxSettings: TagDropbox2Settings<TagOption> = {
    options: stockNameOptionList,
    onOptionSelect: onStockNameSelect,
    subtitle: 'Select a stock',
    placeholder: 'Search for a stock...',
    height: 200,
  };

  return (
    <StyledField>
      <StyledName>Stock name</StyledName>
      <Tag2
        height={40}
        selectedOption={stockNameOption}
        showCreateNewOption={false}
        dropboxSettings={dropboxSettings}
        chipColor={'red100'}
        chipTextColor={'red700'}
      />
    </StyledField>
  );
}

export default SelectStockName;
