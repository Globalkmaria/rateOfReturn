import { Note, NotesState } from '@/features/notes';

import { createNumericSortFunction } from '@/utils';

export const NOTE_FILTER_KEYS: Record<string, keyof Note> = {
  PURCHASED_ID: 'purchasedId',
  SOLD_ID: 'soldId',
  STOCK_NAME: 'stockName',
  TAG: 'tag',
};

export const NOTE_FILTERS = Object.values(NOTE_FILTER_KEYS);

export const NOTE_SORT = 'sort';

export const NOTE_SORT_OPTIONS_KEYS = [
  'createdDate-asc',
  'createdDate-desc',
  'updatedDate-asc',
  'updatedDate-desc',
] as const;

export type NoteSortOptionsKeys = (typeof NOTE_SORT_OPTIONS_KEYS)[number];

export const NOTE_SORT_OPTIONS: {
  value: NoteSortOptionsKeys;
  label: string;
}[] = [
  {
    value: 'createdDate-asc',
    label: 'Created date (Oldest first)',
  },
  {
    value: 'createdDate-desc',
    label: 'Created date (Newest first)',
  },
  {
    value: 'updatedDate-asc',
    label: 'Updated date (Oldest first)',
  },
  {
    value: 'updatedDate-desc',
    label: 'Updated date (Newest first)',
  },
];

const getNoteCreatedDate = (note: Note) => new Date(note.createdAt).getTime();
const getNoteUpdatedDate = (note: Note) => new Date(note.updatedAt).getTime();

export const NOTE_SORT_OPTIONS_FUNCTIONS: Record<
  NoteSortOptionsKeys,
  (
    notes: NotesState['collection'],
    ids: string[],
  ) => NotesState['collection']['allIds']
> = {
  'createdDate-asc': createNumericSortFunction(getNoteCreatedDate, true),
  'createdDate-desc': createNumericSortFunction(getNoteCreatedDate, false),
  'updatedDate-asc': createNumericSortFunction(getNoteUpdatedDate, true),
  'updatedDate-desc': createNumericSortFunction(getNoteUpdatedDate, false),
};
