export interface NoteFormState {
  title: string | null;
  text: string | null;
  purchasedId: string | null;
  soldId: string | null;
  tag: string | null;
  stockName: {
    value: string;
    label: string;
  } | null;
}

export type NoteFormKeys = keyof NoteFormState;

export type NoteFormOnChange = <K extends NoteFormKeys>(
  fieldName: K,
  value: NoteFormState[K],
) => void;
