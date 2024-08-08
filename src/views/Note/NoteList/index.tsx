import styled from 'styled-components';
import NoteItem from './NoteItem';
import { useSelector } from 'react-redux';
import { selectNoteIds } from '@/features/notes';

function NoteList() {
  const noteIds = useSelector(selectNoteIds);
  return (
    <StyledNoteList>
      {noteIds.map(id => (
        <NoteItem key={id} id={id} />
      ))}
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
