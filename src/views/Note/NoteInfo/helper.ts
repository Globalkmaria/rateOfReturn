import { NoteFormState } from './type';

const isEqual = (a: unknown, b: unknown) => {
  if (a === b) return true;

  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!isEqual(a[i], b[i])) return false;
      }
      return true;
    }

    if (
      a.toString() === '[object Object]' &&
      b.toString() === '[object Object]'
    ) {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);

      if (aKeys.length !== bKeys.length) return false;

      for (const key of aKeys) {
        if (
          !isEqual(
            (a as Record<string, unknown>)[key],
            (b as Record<string, unknown>)[key],
          )
        )
          return false;
      }

      return true;
    }

    return false;
  }

  return false;
};

export const checkEditNoteFormHasChanges = (
  originalForm: NoteFormState,
  currentForm: NoteFormState,
) => {
  for (const key of Object.keys(originalForm) as Array<keyof NoteFormState>) {
    if (!isEqual(originalForm[key], currentForm[key])) return true;
  }
  return false;
};

export const isNoteEmpty = (note: NoteFormState) => {
  const keys = Object.keys(note) as Array<keyof NoteFormState>;
  return keys.every(key => !note[key]);
};
