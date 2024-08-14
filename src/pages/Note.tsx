import { lazy, Suspense, useEffect, useState } from 'react';

import useSaveChangedNotesData from '@/views/Note/hooks/useSaveChangedNotesData';
import NoteSkeleton from '@/views/Note/NoteSkeleton';

const Note = lazy(() => import('@/views/Note'));

function NotePage() {
  const [firstLoad, setFirstLoad] = useState(true);
  useSaveChangedNotesData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <Suspense fallback={<NoteSkeleton />}>
      <Note />
    </Suspense>
  );
}

export default NotePage;
