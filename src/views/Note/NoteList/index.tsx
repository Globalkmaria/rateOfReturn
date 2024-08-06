import styled from 'styled-components';
import NoteItem from './NoteItem';

function NoteList() {
  const array = Array.from({ length: 20 });
  return (
    <StyledNoteList>
      {array.map((v, i) => (
        <NoteItem key={i} />
      ))}
    </StyledNoteList>
  );
}

export default NoteList;

const StyledNoteList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  justify-content: space-around;
  gap: 25px;
  padding: 20px;

  @media ${({ theme }) => theme.devices.screen} {
    grid-template-columns: repeat(4, auto);
  }

  @media ${({ theme }) => theme.devices.laptopL} {
    grid-template-columns: repeat(3, auto);
  }
  @media ${({ theme }) => theme.devices.laptop} {
    grid-template-columns: repeat(2, auto);
  }

  @media ${({ theme }) => theme.devices.tablet} {
    grid-template-columns: repeat(1, auto);
  }
`;
