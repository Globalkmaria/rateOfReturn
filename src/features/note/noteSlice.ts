import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddNewNotePayload, NotesState, UpdateNotePayload } from './type';
import { NOTES_MOCK_DATA } from './mockData';

export const NOTE_INITIAL_STATE: NotesState = {
  collection: {
    byId: {},
    allIds: [],
  },
  nextId: 1,
};

const noteSlice = createSlice({
  name: 'notes',
  initialState: NOTES_MOCK_DATA,
  reducers: {
    addNewNote: (state, action: PayloadAction<AddNewNotePayload>) => {
      const newNote = {
        id: String(state.nextId),
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.collection.byId[newNote.id] = newNote;
      state.collection.allIds.push(newNote.id);
      state.nextId++;
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      delete state.collection.byId[action.payload];
      const idx = state.collection.allIds.indexOf(action.payload);
      state.collection.allIds.splice(idx, 1);
    },
    updateNote: (state, action: PayloadAction<UpdateNotePayload>) => {
      const { id, updatedFields } = action.payload;
      const updatedNote = {
        ...state.collection.byId[id],
        ...updatedFields,
        updatedAt: new Date().toISOString(),
      };
      state.collection.byId[id] = updatedNote;
    },
  },
});

export const { addNewNote, deleteNote, updateNote } = noteSlice.actions;

export const noteReducer = noteSlice.reducer;
