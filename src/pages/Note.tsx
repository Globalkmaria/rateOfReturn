import { useEffect, useState } from 'react';

import Note from '@/views/Note';
import useSaveChangedNotesData from '@/views/Note/hooks/useSaveChangedNotesData';

function NotePage() {
  const [firstLoad, setFirstLoad] = useState(true);
  useSaveChangedNotesData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <>
      <Note />
    </>
  );
}

export default NotePage;
