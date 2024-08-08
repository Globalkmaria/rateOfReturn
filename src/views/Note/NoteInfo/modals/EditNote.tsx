import { selectNoteItem, updateNote } from '@/features/notes';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NoteFormKeys, NoteFormState } from '../type';
import { INITIAL_NOTE_FORM_STATE } from '../const';
import PortalModal from '@/components/Modal/PortalModal';
import { StyledForm, StyledNoteModal } from '../components';
import NotePopupForm from '../NotePopupForm';
import { ContainedButton } from '@/components/Button';

interface NotePopupProps {
  onCloseModal: () => void;
  noteId: string;
}

function EditNote({ onCloseModal, noteId }: NotePopupProps) {
  const dispatch = useDispatch();
  const { id, createdAt, updatedAt, stockName, stockId, ...restProps } =
    useSelector(selectNoteItem(noteId));
  const stockNameOption =
    stockName && stockId ? { value: stockId, label: stockName } : null;
  const [formState, setFormState] = useState<NoteFormState>({
    ...INITIAL_NOTE_FORM_STATE,
    ...restProps,
    stockName: stockNameOption,
  });

  const onChange = <K extends NoteFormKeys>(
    fieldName: K,
    value: NoteFormState[K],
  ) => setFormState(prev => ({ ...prev, [fieldName]: value }));

  const onSubmit = () => {
    dispatch(
      updateNote({
        id: noteId,
        updatedFields: {
          ...formState,
          title: formState.title ?? 'Untitled',
          stockId: formState.stockName?.value,
          stockName: formState.stockName?.label,
        },
      }),
    );

    onCloseModal();
  };
  return (
    <PortalModal onClose={onCloseModal}>
      <StyledNoteModal>
        <StyledForm>
          <NotePopupForm onChange={onChange} formState={formState} />
          <ContainedButton onClick={onSubmit}>Update</ContainedButton>
        </StyledForm>
      </StyledNoteModal>
    </PortalModal>
  );
}

export default EditNote;
