import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { setLocalStorageItem } from '@/utils/getLocalStorage';

import { selectNotes } from '@/features/notes';

const useSaveChangedNotesData = (firstLoad: boolean) => {
  const notes = useSelector(selectNotes);

  useEffect(() => {
    if (!firstLoad) setLocalStorageItem('notes', notes);
  }, [notes]);
};

export default useSaveChangedNotesData;
