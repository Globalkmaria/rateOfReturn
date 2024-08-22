import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectNoteCollection } from '@/features/notes';

import NoteFilter from './NoteFilter';
import { NOTE_FILTER_KEYS, NOTE_SORT, NOTE_SORT_OPTIONS } from '../const';
import { getNoteFilterOptions } from '../helper';

interface Props {
  disabled?: boolean;
}

function NoteFilters({ disabled }: Props) {
  const notes = useSelector(selectNoteCollection);
  const noteOptions = getNoteFilterOptions(notes);

  return (
    <StyledFilters>
      {FILTERS.map(item => (
        <NoteFilter
          key={item.name}
          disabled={disabled}
          name={item.name}
          label={item.label}
          title={item.title}
          options={noteOptions[item.optionsKey]}
        />
      ))}
      <NoteFilter
        disabled={disabled}
        replaceParams={false}
        name={NOTE_SORT}
        label='Sort'
        title='Sort by'
        options={NOTE_SORT_OPTIONS}
        horizontal='right'
      />
    </StyledFilters>
  );
}

export default memo(NoteFilters);

const FILTERS: {
  name: string;
  label: string;
  title: string;
  optionsKey: keyof ReturnType<typeof getNoteFilterOptions>;
  horizontal?: 'left' | 'right';
}[] = [
  {
    name: NOTE_FILTER_KEYS.STOCK_NAME,
    label: 'Stock name',
    title: 'Filter by stock name',
    optionsKey: 'stockNames',
  },
  {
    name: NOTE_FILTER_KEYS.PURCHASED_ID,
    label: 'Stock id',
    title: 'Filter by stock id',
    optionsKey: 'purchasedIds',
  },
  {
    name: NOTE_FILTER_KEYS.SOLD_ID,
    label: 'Sold id',
    title: 'Filter by sold id',
    optionsKey: 'soldIds',
  },
  {
    name: NOTE_FILTER_KEYS.TAG,
    label: 'Tag',
    title: 'Filter by tag',
    optionsKey: 'tags',
    horizontal: 'right',
  },
];

const StyledFilters = styled.div`
  grid-area: filters;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media ${({ theme }) => theme.devices.laptop} {
    justify-content: flex-end;
  }
`;
