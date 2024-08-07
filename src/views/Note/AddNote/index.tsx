import styled from 'styled-components';

import PortalModal from '@/components/Modal/PortalModal';
import { SelectStockName } from './SelectStockName';
import { SelectPurchasedId } from './SelectPurchasedId';
import { SelectTag } from './SelectTag';
import { useSelector } from 'react-redux';
import { selectStocks } from '@/features/stockList/selectors';
import { useState } from 'react';
import { TagOption } from '@/components/Tag2/Tag2Option';
import SelectSoldId from './SelectSoldId';

interface AddNoteProps {
  onCloseModal: () => void;
}

function AddNote({ onCloseModal }: AddNoteProps) {
  const stocks = useSelector(selectStocks);
  const stockNameOptionList = stocks.allIds.map(id => ({
    value: stocks.byId[id].mainInfo.stockId,
    label: stocks.byId[id].mainInfo.stockName,
  }));
  const [stockNameOption, setStockNameOption] = useState<null | TagOption>(
    null,
  );
  const onStockNameSelect = (newOption: TagOption | null) =>
    setStockNameOption(newOption);

  return (
    <PortalModal onClose={onCloseModal}>
      <StyledAddNote>
        <StyledForm action=''>
          <StyledTitle name='title' placeholder='Untitled' />
          <SelectStockName
            stockNameOptionList={stockNameOptionList}
            stockNameOption={stockNameOption}
            onStockNameSelect={onStockNameSelect}
          />
          <SelectPurchasedId stockId={stockNameOption?.value ?? null} />
          <SelectSoldId />
          <SelectTag />
          <textarea name='' id='' />
        </StyledForm>
      </StyledAddNote>
    </PortalModal>
  );
}

export default AddNote;

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
