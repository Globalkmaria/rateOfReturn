import { NotesState } from '@/features/notes';
import { ReplaceUserDataRepReq } from '@/repository/userData/type';

export function formatNotesAsServerFormat(
  notes: NotesState,
): ReplaceUserDataRepReq['notes'] | null {
  if (!notes)
    return {
      notes: {},
      nextId: 1,
    };

  if (!notes.nextId) return null;
  if (!notes.collection?.byId) return null;

  return {
    notes: notes.collection.byId,
    nextId: notes.nextId,
  };
}
