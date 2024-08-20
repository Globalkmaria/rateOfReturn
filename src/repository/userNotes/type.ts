import { Note } from '@/features/notes';

export type AddNewNoteRes = Pick<Note, 'id' | 'createdAt' | 'updatedAt'>;

export type EditNoteRes = Pick<Note, 'updatedAt'>;
