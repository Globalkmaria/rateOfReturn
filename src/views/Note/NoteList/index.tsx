import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { selectNoteCollection } from '@/features/notes';

import useModal from '@/views/List/hooks/useModal';

import EditNote from '../NoteInfo/modals/EditNote';
import {
  getFilteredNoteIdsBySearchParams,
  getFilteredNoteIdsByTitle,
  getSortedNoteIds,
} from '../helper';
import NoNote from '../NoNote';
import NoteItem from './NoteItem';

interface Props {
  searchTitle: string;
}

function NoteList({ searchTitle }: Props) {
  const [searchParams] = useSearchParams();
  const { showModal, onOpenModal, onCloseModal } = useModal();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const notes = useSelector(selectNoteCollection);

  const showNoteModal = showModal && selectedNoteId;
  const noNote = !notes.allIds.length;

  const onNoteClick = useCallback((id: string) => {
    setSelectedNoteId(id);
    onOpenModal();
  }, []);

  const onCloseNoteModal = () => {
    setSelectedNoteId(null);
    onCloseModal();
  };

  if (noNote) return <NoNote />;

  const filteredNoteIds = getFilteredNoteIdsBySearchParams(searchParams, notes);
  const filteredNotesByTitle = getFilteredNoteIdsByTitle(
    searchTitle,
    notes,
    filteredNoteIds,
  );
  const sortedNoteIds = getSortedNoteIds(
    searchParams,
    filteredNotesByTitle,
    notes,
  );

  return (
    <StyledNoteList>
      {sortedNoteIds.map(id => (
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
