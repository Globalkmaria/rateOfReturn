import { useState } from 'react';
import { useDispatch } from 'react-redux';

import PortalModal from '@/components/Modal/PortalModal';
import { ContainedButton } from '@/components/Button';
import { addNewNote } from '@/features/notes';

import NotePopupForm from '../NotePopupForm';
import { StyledForm, StyledNoteModal } from '../components';
import { NoteFormKeys, NoteFormState } from '../type';
import { INITIAL_NOTE_FORM_STATE } from '../const';

interface NotePopupProps {
  onCloseModal: () => void;
}

function AddNote({ onCloseModal }: NotePopupProps) {
  const dispatch = useDispatch();

  const [formState, setFormState] = useState<NoteFormState>(
    INITIAL_NOTE_FORM_STATE,
  );

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
      <StyledNoteModal>
        <StyledForm>
          <NotePopupForm onChange={onChange} formState={formState} />
          <ContainedButton onClick={onSubmit}>Add</ContainedButton>
        </StyledForm>
      </StyledNoteModal>
    </PortalModal>
  );
}

export default AddNote;
