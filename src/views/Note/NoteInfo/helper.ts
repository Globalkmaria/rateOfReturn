import { NoteFormState } from './type';

export const checkAddNoteFormHasChanges = (form: NoteFormState) =>
  Object.values(form).some(Boolean);

export const checkEditNoteFormHasChanges = (
  originalForm: NoteFormState,
  currentForm: NoteFormState,
) => {
  const original = Object.values(originalForm);
  const current = Object.values(currentForm);

  return original.some(
    (originalValue, index) => originalValue !== current[index],
  );
};
