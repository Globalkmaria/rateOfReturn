import styled from 'styled-components';

import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';
import Search from '@/components/Search';

import NoteFilters from './NoteFilters';
import { INITIAL_NOTE_FORM_STATE } from './NoteInfo/const';
import useModal from '../List/hooks/useModal';
import AddNote from './NoteInfo/modals/AddNote';

interface Props {
  disabled?: boolean;
  searchTitle: string;
  onSearchTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function NoteControlBar({ disabled, searchTitle, onSearchTitleChange }: Props) {
  const { showModal, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      <StyledNoteControlBar>
        <StyledSearch
          width='100%'
          value={searchTitle}
          placeholder={SEARCH_PLACEHOLDER_TEXT}
          height='s'
          onChange={onSearchTitleChange}
        />
        <NoteFilters disabled={disabled} />
        <StyledNewButton size='s' onClick={onOpenModal} disabled={disabled}>
          <Icon icon='add' disabled={disabled} />
          <span>New Note</span>
        </StyledNewButton>
      </StyledNoteControlBar>

      {showModal && (
        <AddNote
          initialFormState={INITIAL_NOTE_FORM_STATE}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
}

export default NoteControlBar;

const SEARCH_PLACEHOLDER_TEXT = 'Search by title...';

const StyledNoteControlBar = styled.div`
  padding: 20px 40px 0;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr auto auto;
  grid-template-areas: 'title filters new-button';

  & > ${BorderButton} {
    gap: 5px;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    grid-template-areas: 'title new-button' 'filters filters';
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px 20px 0;
  }
`;

const StyledSearch = styled(Search)`
  grid-area: title;
`;

const StyledNewButton = styled(BorderButton)`
  grid-area: new-button;
`;
