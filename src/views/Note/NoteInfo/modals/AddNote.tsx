import { useState } from 'react';
import { useDispatch } from 'react-redux';

import PortalModal from '@/components/Modal/PortalModal';
import { ContainedButton } from '@/components/Button';
import { addNewNote } from '@/features/notes';

import NotePopupForm from '../NotePopupForm';
import { StyledForm, StyledNotePopup } from '../components';
import { NoteFormKeys, NoteFormState } from '../type';

interface NotePopupProps {
  onCloseModal: () => void;
}

const INITIAL_STATE: NoteFormState = {
  title: null,
  text: null,
  purchasedId: null,
  soldId: null,
  tag: null,
  stockName: null,
};

function AddNote({ onCloseModal }: NotePopupProps) {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState<NoteFormState>(INITIAL_STATE);

  const onChange = <K extends NoteFormKeys>(
    fieldName: K,
    value: NoteFormState[K],
  ) => setFormState(prev => ({ ...prev, [fieldName]: value }));

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
      <StyledNotePopup>
        <StyledForm>
          <NotePopupForm onChange={onChange} formState={formState} />
          <ContainedButton onClick={onSubmit}>Add Note</ContainedButton>
        </StyledForm>
      </StyledNotePopup>
    </PortalModal>
  );
}

export default AddNote;
