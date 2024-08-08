import styled from 'styled-components';
import NoteItem from './NoteItem';
import { useSelector } from 'react-redux';
import { selectNoteIds } from '@/features/notes';
import useModal from '@/views/List/hooks/useModal';
import { useState } from 'react';
import EditNote from '../NoteInfo/modals/EditNote';

function NoteList() {
  const { showModal, onOpenModal, onCloseModal, onToggleModal } = useModal();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const noteIds = useSelector(selectNoteIds);
  const showNoteModal = showModal && selectedNoteId;

  const onNoteClick = (id: string) => {
    setSelectedNoteId(id);
    onOpenModal();
  };

  const onCloseNoteModal = () => {
    setSelectedNoteId(null);
    onCloseModal();
  };

  return (
    <StyledNoteList>
      {noteIds.map(id => (
        <div onClick={() => onNoteClick(id)} key={id}>
          <NoteItem id={id} />
        </div>
      ))}
      {showNoteModal && (
        <EditNote onCloseModal={onCloseNoteModal} noteId={selectedNoteId} />
      )}
    </StyledNoteList>
  );
}

export default NoteList;

const StyledNoteList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-around;
  gap: 25px;
  padding: 20px;

  @media ${({ theme }) => theme.devices.screen} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${({ theme }) => theme.devices.laptopL} {
    grid-template-columns: repeat(3, 1fr);
  }
  @media ${({ theme }) => theme.devices.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: repeat(1, 1fr);
  }
`;
