import { Note } from '@/features/notes';

export type AddNewNoteRes = Pick<Note, 'id' | 'createdAt' | 'updatedAt'>;
