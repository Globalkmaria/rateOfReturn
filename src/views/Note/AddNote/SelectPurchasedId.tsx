import { useState } from 'react';
import { useSelector } from 'react-redux';

import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import { selectStockPurchasedIds } from '@/features/stockList/selectors';
import { StyledField, StyledName } from './components';

type SelectPurchasedIdProps = {
  stockId: string | null;
};

export function SelectPurchasedId({ stockId }: SelectPurchasedIdProps) {
  const [option, setOption] = useState<null | string>(null);
  const onOptionSelect = (newOption: string | null) => setOption(newOption);

  const options = useSelector(selectStockPurchasedIds(stockId));
  const dropboxSettings: TagDropbox2Settings<string> = {
    options,
    onOptionSelect,
    subtitle: 'Select a stock id',
    placeholder: 'Search for a stock id...',
    height: 200,
  };
  return (
    <StyledField>
      <StyledName>Stock id</StyledName>
      <Tag2
        chipColor='blue100'
        chipTextColor='blue700'
        height={40}
        selectedOption={option}
        dropboxSettings={dropboxSettings}
        showCreateNewOption={false}
      />
    </StyledField>
  );
}
