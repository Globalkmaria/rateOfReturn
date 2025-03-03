import { Note } from '@/features/notes';

import {
  createNumericSortFunction,
  DeepSortFunction,
  ExtractFunction,
} from '@/components/table/sort/utils';

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

type NoteSortProps = {
  ids: string[];
  items: Record<string, Note>;
};

const getNoteCreatedDate: NoteExtractFunction<number> = (
  { items }: NoteSortProps,
  id: string,
) => new Date(items[id].createdAt).getTime();
const getNoteUpdatedDate: NoteExtractFunction<number> = (
  { items }: NoteSortProps,
  id: string,
) => new Date(items[id].updatedAt).getTime();

type NoteSortFunction = DeepSortFunction<string, NoteSortProps>;

export type NoteExtractFunction<V extends string | number> = ExtractFunction<
  NoteSortProps,
  string,
  V
>;

export const NOTE_SORT_OPTIONS_FUNCTIONS: Record<
  NoteSortOptionsKeys,
  NoteSortFunction
> = {
  'createdDate-asc': createNumericSortFunction(getNoteCreatedDate, true),
  'createdDate-desc': createNumericSortFunction(getNoteCreatedDate, false),
  'updatedDate-asc': createNumericSortFunction(getNoteUpdatedDate, true),
  'updatedDate-desc': createNumericSortFunction(getNoteUpdatedDate, false),
};
