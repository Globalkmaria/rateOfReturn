import { lazy, Suspense } from 'react';

import NoteSkeleton from '@/views/Note/NoteSkeleton';

const Note = lazy(() => import('@/views/Note'));

function NotePage() {
  return (
    <Suspense fallback={<NoteSkeleton />}>
      <Note />
    </Suspense>
  );
}

export default NotePage;
