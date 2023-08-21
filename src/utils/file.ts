import { store } from '../store';
import { getCurrentDateTimeString } from './time';
import { saveAs } from 'file-saver';

export const handleGetDataFile = () => {
  const data = store.getState();
  const blob = new Blob([JSON.stringify(data)], {
    type: 'application/json',
  });
  const date = getCurrentDateTimeString();
  saveAs(blob, `RoR${date}.json`);
};
