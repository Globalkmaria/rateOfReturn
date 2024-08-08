import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectNotes = (state: RootState) => state.notes;
export const selectNoteCollection = (state: RootState) =>
  state.notes.collection;
export const selectNoteIds = (state: RootState) =>
  state.notes.collection.allIds;

export const selectNoteItem = (id: string) =>
  createSelector([selectNoteCollection], noteList => noteList.byId[id]);
