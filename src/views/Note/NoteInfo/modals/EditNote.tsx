import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectNoteItem, updateNote } from '@/features/notes';
import PortalModal from '@/components/Modal/PortalModal';
import { ContainedButton } from '@/components/Button';
import Flex from '@/components/Flex';

import NotePopupForm from '../NotePopupForm';
import { INITIAL_NOTE_FORM_STATE } from '../const';
import { NoteFormKeys, NoteFormState } from '../type';
import { StyledForm, StyledNoteModal } from '../components';
import { formatNoteDate } from '../../NoteList/helper';
import { StyledDate, StyledDateIcon } from '../../NoteList/components';
import CloseWarningModal from '../CloseWarningModal';
import { checkEditNoteFormHasChanges } from '../helper';
import { selectIsLoggedIn } from '@/features/user/selectors';
import userNotesService from '@/service/userNotes/service';
import NoteSubmitButton from '../NoteSubmitButton';

interface NotePopupProps {
  onCloseModal: () => void;
  noteId: string;
}

function EditNote({ onCloseModal, noteId }: NotePopupProps) {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showWarning, setShowWarning] = useState(false);
  const { id, createdAt, updatedAt, stockName, stockId, ...restProps } =
    useSelector(selectNoteItem(noteId));

  const stockNameOption =
    stockName && stockId ? { value: stockId, label: stockName } : null;

  const formInitialState: NoteFormState = {
    ...INITIAL_NOTE_FORM_STATE,
    ...restProps,
    stockName: stockNameOption,
  };
  const [formState, setFormState] = useState<NoteFormState>(formInitialState);

  const formattedCreatedAt = formatNoteDate(createdAt);
  const formattedUpdatedAt = formatNoteDate(updatedAt);

  const onChange = <K extends NoteFormKeys>(
    fieldName: K,
    value: NoteFormState[K],
  ) => setFormState(prev => ({ ...prev, [fieldName]: value }));

  const onSubmit = async () => {
    const newNote = {
      id: noteId,
      updatedFields: {
        ...formState,
        title: formState.title ?? 'Untitled',
        stockId: formState.stockName?.value,
        stockName: formState.stockName?.label,
      },
    };

    if (!isLoggedIn) {
      dispatch(updateNote(newNote));
      onCloseModal();
      return;
    }

    const result = await userNotesService.editNote(
      noteId,
      newNote.updatedFields,
    );

    if (!result.data) {
      alert(result.message);
      return;
    }

    dispatch(
      updateNote({
        id: noteId,
        updatedFields: {
          ...formState,
          title: formState.title ?? 'Untitled',
          stockId: formState.stockName?.value,
          stockName: formState.stockName?.label,
          updatedAt: result.data.updatedAt,
        },
      }),
    );

    onCloseModal();
  };

  const onCheckChangeAndCloseModal = () => {
    const changes = checkEditNoteFormHasChanges(formInitialState, formState);

    if (changes) {
      setShowWarning(true);
      return;
    }

    onCloseModal();
  };

  const onCloseWarningModal = () => setShowWarning(false);

  const onCloseMainModal = () => {
    onCloseModal();
    onCloseWarningModal();
  };
  return (
    <>
      <PortalModal onClose={onCheckChangeAndCloseModal}>
        <StyledNoteModal>
          <StyledForm action={onSubmit}>
            <NotePopupForm onChange={onChange} formState={formState} />

            <StyledDateContainer gap={5} justifyContent='space-between'>
              <StyledDate alignItems='center'>
                <StyledDateIcon />
                <StyledTitle>Created at</StyledTitle>
                {formattedCreatedAt}
              </StyledDate>
              <StyledDate alignItems='center'>
                <StyledDateIcon />
                <StyledTitle>Last update</StyledTitle>
                {formattedUpdatedAt}
              </StyledDate>
            </StyledDateContainer>

            <NoteSubmitButton />
          </StyledForm>
        </StyledNoteModal>
      </PortalModal>
      {showWarning && (
        <CloseWarningModal
          onCloseMainModal={onCloseMainModal}
          onContinueWriting={onCloseWarningModal}
        />
      )}
    </>
  );
}

export default EditNote;

const StyledDateContainer = styled(Flex)`
  font-size: 0.8rem;
`;

const StyledTitle = styled.span`
  color: inherit;
  margin-right: 8px;

  @media ${({ theme }) => theme.devices.tablet} {
    margin-right: 0px;
  }
`;
