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

  const { stockNames, purchasedIds, soldIds, tags } =
    getNoteFilterOptions(notes);

  return (
    <StyledFilters>
      <NoteFilter
        disabled={disabled}
        name={NOTE_FILTER_KEYS.STOCK_NAME}
        label='Stock name'
        title='Filter by stock name'
        options={stockNames}
      />
      <NoteFilter
        disabled={disabled}
        name={NOTE_FILTER_KEYS.PURCHASED_ID}
        label='Stock Id'
        title='Filter by stock id'
        options={purchasedIds}
      />
      <NoteFilter
        disabled={disabled}
        name={NOTE_FILTER_KEYS.SOLD_ID}
        label='Sold Id'
        title='Filter by sold id'
        options={soldIds}
      />
      <NoteFilter
        disabled={disabled}
        name={NOTE_FILTER_KEYS.TAG}
        label='Tag'
        title='Filter by tag'
        options={tags}
        horizontal='right'
      />
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

const StyledFilters = styled.div`
  grid-area: filters;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media ${({ theme }) => theme.devices.laptop} {
    justify-content: flex-end;
  }
`;
