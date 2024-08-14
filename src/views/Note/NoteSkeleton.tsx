import styled from 'styled-components';

import { Skeleton } from '@/components/Skeleton';
import NoteControlBar from './NoteControlBar';
import { StyledNoteList } from './NoteList';

function NoteSkeleton() {
  const list = Array.from({ length: 6 }, (_, i) => i);
  return (
    <>
      <NoteControlBar disabled />
      <StyledNoteList>
        {list.map(item => (
          <StyledSkeleton key={item} />
        ))}
      </StyledNoteList>
    </>
  );
}

export default NoteSkeleton;

const StyledSkeleton = styled(Skeleton)`
  border-radius: 13px;
  width: 100%;
  height: 200px;
`;