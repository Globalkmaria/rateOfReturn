import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@/store';

export const selectNotes = (state: RootState) => state.notes;
export const selectNoteCollection = (state: RootState) =>
  state.notes.collection;
export const selectNoteIds = (state: RootState) =>
  state.notes.collection.allIds;

export const selectNoteItem = (id: string) =>
  createSelector([selectNoteCollection], noteList => noteList.byId[id]);
