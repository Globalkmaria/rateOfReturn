import { useSelector } from 'react-redux';

import { selectStocks } from '@/features/stockList/selectors';
import { selectNotes } from '@/features/notes';

import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import { TagOption } from '@/components/Tag2/Tag2Option';
import Icon from '@/components/Icon';

import { getStockNameOptionList } from '../helper';
import { StyledField, StyledName } from './components';
import { NoteFormOnChange } from './type';

interface SelectStockNameProps {
  stockName: TagOption | null;
  onChange: NoteFormOnChange;
}

function SelectStockName({ onChange, stockName }: SelectStockNameProps) {
  const stocks = useSelector(selectStocks);
  const notes = useSelector(selectNotes);

  const options = getStockNameOptionList(stocks, notes.collection);

  const dropboxSettings: TagDropbox2Settings<TagOption> = {
    options,
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
