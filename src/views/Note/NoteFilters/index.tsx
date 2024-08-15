import { memo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectNoteCollection } from '@/features/notes';

import NoteFilter from './NoteFilter';
import { NOTE_SORT_OPTIONS } from '../const';
import { getNoteFilterOptions } from '../helper';

function NoteFilters() {
  const notes = useSelector(selectNoteCollection);

  const { stockNames, purchasedIds, soldIds, tags } =
    getNoteFilterOptions(notes);

  return (
    <StyledFilters>
      <NoteFilter
        name='stockName'
        label='Stock name'
        title='Filter by stock name'
        options={stockNames}
      />
      <NoteFilter
        name='purchasedId'
        label='Stock Id'
        title='Filter by stock id'
        options={purchasedIds}
      />
      <NoteFilter
        name='soldId'
        label='Sold Id'
        title='Filter by sold id'
        options={soldIds}
      />
      <NoteFilter
        name='tag'
        label='Tag'
        title='Filter by tag'
        options={tags}
        horizontal='right'
      />
      <NoteFilter
        replaceParams={false}
        name='sort'
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
