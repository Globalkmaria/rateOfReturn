import { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { selectNoteIds } from '@/features/notes';

import useModal from '@/views/List/hooks/useModal';
import EditNote from '../NoteInfo/modals/EditNote';
import NoNote from '../NoNote';
import NoteItem from './NoteItem';

function NoteList() {
  const { showModal, onOpenModal, onCloseModal } = useModal();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const noteIds = useSelector(selectNoteIds);
  const showNoteModal = showModal && selectedNoteId;
  const noNote = !noteIds.length;

  const onNoteClick = (id: string) => {
    setSelectedNoteId(id);
    onOpenModal();
  };

  const onCloseNoteModal = () => {
    setSelectedNoteId(null);
    onCloseModal();
  };

  if (noNote) return <NoNote />;

  return (
    <StyledNoteList>
      {noteIds.map(id => (
        <NoteItem id={id} key={id} onNoteClick={onNoteClick} />
      ))}
      {showNoteModal && (
        <EditNote onCloseModal={onCloseNoteModal} noteId={selectedNoteId} />
      )}
    </StyledNoteList>
  );
}

export default NoteList;

export const StyledNoteList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: space-around;
  gap: 25px;
  padding: 20px 40px;

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

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px;
  }
`;
