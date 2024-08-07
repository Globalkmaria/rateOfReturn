import styled from 'styled-components';

import PortalModal from '@/components/Modal/PortalModal';
import Tag2 from '@/components/Tag2';
import { TagDropbox2Settings } from '@/components/Tag2/Tag2Dropbox';
import { TagOption } from '@/components/Tag2/Tag2Option';
import {
  selectStockInfoById,
  selectStockTags,
  selectStocks,
} from '@/features/stockList/selectors';
import { useState } from 'react';
import { useSelector } from 'react-redux';

interface AddNoteProps {
  onCloseModal: () => void;
}

function AddNote({ onCloseModal }: AddNoteProps) {
  return (
    <PortalModal onClose={onCloseModal}>
      <StyledAddNote>
        <StyledForm action=''>
          <StyledTitle name='title' placeholder='Untitled' />
          <SelectStockName />
          <SelectPurchasedId stockId='1' />
          <SelectTag />
          <textarea name='' id='' />
        </StyledForm>
      </StyledAddNote>
    </PortalModal>
  );
}

export default AddNote;

function SelectStockName() {
  const stocks = useSelector(selectStocks);
  const options = stocks.allIds.map(id => ({
    value: stocks.byId[id].mainInfo.stockId,
    label: stocks.byId[id].mainInfo.stockName,
  }));
  const [option, setOption] = useState<null | TagOption>(null);
  const onOptionSelect = (newOption: TagOption | null) => setOption(newOption);
  const dropboxSettings: TagDropbox2Settings<(typeof options)[number]> = {
    options,
    onOptionSelect,
  };
  return (
    <StyledField>
      <StyledName>Stock name</StyledName>
      <Tag2
        height={40}
        selectedOption={option}
        showCreateNewOption={false}
        subtitle='Select a stock'
        dropboxSettings={dropboxSettings}
      />
    </StyledField>
  );
}

function SelectPurchasedId({ stockId }: { stockId: string }) {
  const options = useSelector(selectStockInfoById(stockId)).purchasedItems
    .allIds;

  const [option, setOption] = useState<null | string>(null);
  const onOptionSelect = (newOption: string | null) => setOption(newOption);
  const dropboxSettings: TagDropbox2Settings<(typeof options)[number]> = {
    options,
    onOptionSelect,
  };
  return (
    <StyledField>
      <StyledName>Stock id</StyledName>
      <Tag2
        height={40}
        selectedOption={option}
        dropboxSettings={dropboxSettings}
        showCreateNewOption={false}
        subtitle='Select a stock id'
      />
    </StyledField>
  );
}

function SelectTag() {
  const options = useSelector(selectStockTags);
  const [option, setOption] = useState<null | string>(null);
  const onOptionSelect = (newOption: string | null) => setOption(newOption);
  const onDeleteOption = (option: string) => {};
  const dropboxSettings: TagDropbox2Settings<(typeof options)[number]> = {
    options,
    onOptionSelect,
    onDeleteOption,
    showDeleteItem: true,
  };
  return (
    <StyledField>
      <StyledName>Tag</StyledName>
      <Tag2
        height={40}
        dropboxSettings={dropboxSettings}
        selectedOption={option}
      />
    </StyledField>
  );
}

const StyledAddNote = styled.div`
  width: 500px;
  padding: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTitle = styled.input.attrs({
  type: 'text',
})`
  width: 100%;
  margin-bottom: 10px;
  border: none;
  font-size: 1.6rem;
  font-weight: 600;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grey400};
  }
`;

const StyledField = styled.div`
  display: flex;
  align-items: center;

  .radio-select__button {
    border: none;

    &:hover {
      border: none;
    }
  }
`;

const StyledName = styled.span`
  width: 150px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey600};
`;
