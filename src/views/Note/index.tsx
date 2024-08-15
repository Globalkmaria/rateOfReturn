import { useDeferredValue, useState } from 'react';

import NoteControlBar from './NoteControlBar';
import NoteList from './NoteList';

function Note() {
  const [searchTitle, setSearchTitle] = useState('');
  const deferredSearchTitle = useDeferredValue(searchTitle);

  const onSearchTitleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTitle(e.target.value);

  return (
    <>
      <NoteControlBar
        searchTitle={searchTitle}
        onSearchTitleChange={onSearchTitleChange}
      />
      <NoteList searchTitle={deferredSearchTitle} />
    </>
  );
}

export default Note;
