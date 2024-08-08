import { selectNotes } from '@/features/notes';
import { setLocalStorageItem } from '@/utils/getLocalStorage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useSaveChangedNotesData = (firstLoad: boolean) => {
  const notes = useSelector(selectNotes);

  useEffect(() => {
    if (!firstLoad) setLocalStorageItem('notes', notes);
  }, [notes]);
};

export default useSaveChangedNotesData;
