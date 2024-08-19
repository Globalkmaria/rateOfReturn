import { Collections } from '@/typeUtils/typeGenerators';

export interface Note {
  id: string;

  title: string;
  text?: string | null;

  stockName?: string | null;
  stockId?: string | null;
  tag?: string | null;
  purchasedId?: string | null;
  soldId?: string | null;

  createdAt: string;
  updatedAt: string;
}

export type NoteContent = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;

export interface NotesState {
  collection: Collections<Note>;
  nextId: number;
}

export type AddNewNotePayload = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateNotePayload = {
  id: string;
  updatedFields: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>;
};
