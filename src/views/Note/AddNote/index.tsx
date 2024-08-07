import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import PortalModal from '@/components/Modal/PortalModal';
import { selectStocks } from '@/features/stockList/selectors';
import Textarea from '@/components/Textarea';
import { ContainedButton } from '@/components/Button';
import { addNewNote } from '@/features/note';

import SelectStockName from './SelectStockName';
import SelectPurchasedId from './SelectPurchasedId';
import SelectSoldId from './SelectSoldId';
import SelectTag from './SelectTag';

interface AddNoteProps {
  onCloseModal: () => void;
}

export interface NoteFormState {
  title: string | null;
  text: string | null;
  purchasedId: string | null;
  soldId: string | null;
  tag: string | null;
  stockName: {
    value: string;
    label: string;
  } | null;
}

export type NoteFormKeys = keyof NoteFormState;

export type NoteFormOnChange = <K extends NoteFormKeys>(
  fieldName: K,
  value: NoteFormState[K],
) => void;

const INITIAL_STATE: NoteFormState = {
  title: null,
  text: null,
  purchasedId: null,
  soldId: null,
  tag: null,
  stockName: null,
};

const TITLE_PLACEHOLDER = 'Untitled';
const TEXTAREA_PLACEHOLDER = 'Add your note here...';

function AddNote({ onCloseModal }: AddNoteProps) {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState<NoteFormState>(INITIAL_STATE);
  const stocks = useSelector(selectStocks);
  const stockNameOptionList = stocks.allIds.map(id => ({
    value: stocks.byId[id].mainInfo.stockId,
    label: stocks.byId[id].mainInfo.stockName,
  }));

  const title = formState.title ?? '';
  const stockIdForSelectPurchasedId = formState.stockName?.value ?? null;
  const text = formState.text ?? '';

  const onChange = <K extends NoteFormKeys>(
    fieldName: K,
    value: NoteFormState[K],
  ) => setFormState(prev => ({ ...prev, [fieldName]: value }));

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange('title', e.target.value);

  const onTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    onChange('text', e.target.value);

  const onSubmit = () => {
    dispatch(
      addNewNote({
        ...formState,
        stockId: formState.stockName?.value,
        stockName: formState.stockName?.label,
        title: formState.title ?? 'Untitled',
      }),
    );

    onCloseModal();
  };

  return (
    <PortalModal onClose={onCloseModal}>
      <StyledAddNote>
        <StyledForm>
          <StyledTitle
            onChange={onTitleChange}
            value={title}
            placeholder={TITLE_PLACEHOLDER}
          />
          <SelectStockName
            stockNameOptionList={stockNameOptionList}
            stockName={formState.stockName}
            onChange={onChange}
          />
          <SelectPurchasedId
            purchasedId={formState.purchasedId}
            stockId={stockIdForSelectPurchasedId}
            onChange={onChange}
          />
          <SelectSoldId soldId={formState.soldId} onChange={onChange} />
          <SelectTag tag={formState.tag} onChange={onChange} />
          <StyledTextarea
            onChange={onTextareaChange}
            value={text}
            rows={5}
            placeholder={TEXTAREA_PLACEHOLDER}
          />
          <ContainedButton onClick={onSubmit}>Add Note</ContainedButton>
        </StyledForm>
      </StyledAddNote>
    </PortalModal>
  );
}

export default AddNote;

const StyledTextarea = styled(Textarea)`
  margin-top: 20px;
`;

const StyledAddNote = styled.div`
  width: 500px;
  padding: 20px 60px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${ContainedButton} {
    margin-top: 10px;
  }
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
