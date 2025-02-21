import { useSelector } from 'react-redux';

import { selectNoteCollection } from '@/features/notes';
import {
  selectStockPurchasedIds,
  selectStocks,
} from '@/features/stockList/selectors';

import Icon from '@/components/Icon';
import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';

import { StyledField, StyledName } from './components';
import { NoteFormOnChange } from './type';
import { getPurchasedIdOptionList } from '../helper';

interface SelectPurchasedIdProps {
  stockId: string | null;
  purchasedId: string | null;
  onChange: NoteFormOnChange;
}

function SelectPurchasedId({
  stockId,
  purchasedId,
  onChange,
}: SelectPurchasedIdProps) {
  const stockInfo = useSelector(selectStocks);
  const notes = useSelector(selectNoteCollection);
  const purchasedIds = useSelector(selectStockPurchasedIds(stockId));

  const options = stockId
    ? purchasedIds
    : getPurchasedIdOptionList(stockInfo, notes);

  const onOptionSelect = (newOption: string | null) =>
    onChange('purchasedId', newOption);

  const dropboxSettings: TagDropbox2Settings<string> = {
    options,
    onOptionSelect,
    subtitle: 'Select a stock id',
    placeholder: 'Search for a stock id...',
    height: 200,
    showCreateNewOption: false,
  };
  return (
    <StyledField>
      <StyledName>
        <Icon icon='tag1' color='grey600' />
        Stock id
      </StyledName>
      <Tag2
        chipColor='blue100'
        chipTextColor='blue700'
        height={40}
        selectedOption={purchasedId}
        dropboxSettings={dropboxSettings}
        showCreateNewOption={false}
      />
    </StyledField>
  );
}

export default SelectPurchasedId;
