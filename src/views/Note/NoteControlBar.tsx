import styled from 'styled-components';

import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';
import Search from '@/components/Search';

import useModal from '../List/hooks/useModal';
import AddNote from './NoteInfo/modals/AddNote';
import { INITIAL_NOTE_FORM_STATE } from './NoteInfo/const';
import NoteFilter from './NoteFilter';
import { NOTE_SORT_OPTIONS } from './const';

interface Props {
  disabled?: boolean;
}

function NoteControlBar({ disabled }: Props) {
  const { showModal, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      <StyledNoteControlBar>
        <StyledSearch
          width='100%'
          value={''}
          placeholder={SEARCH_PLACEHOLDER_TEXT}
          height='s'
          onChange={() => {}}
        />
        <StyledFilters>
          <NoteFilter
            name='stockName'
            label='Stock name'
            title='Filter by stock name'
            options={[
              { value: 'Apple', label: 'Apple' },
              { value: 'Google', label: 'Google' },
              { value: 'Facebook', label: 'Facebook' },
            ]}
          />
          <NoteFilter
            name='stockId'
            label='Stock Id'
            title='Filter by stock id'
            options={[
              { value: '12345', label: '12345' },
              { value: '67890', label: '67890' },
              { value: '98765', label: '98765' },
            ]}
          />
          <NoteFilter
            name='soldId'
            label='Sold Id'
            title='Filter by sold id'
            options={[]}
          />
          <NoteFilter
            name='tag'
            label='Tag'
            title='Filter by tag'
            options={[]}
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
        <StyledNewButton size='s' onClick={onOpenModal} disabled={disabled}>
          <Icon icon='add' disabled={disabled} />
          <span>New Note</span>
        </StyledNewButton>
      </StyledNoteControlBar>

      {showModal && (
        <AddNote
          initialFormState={INITIAL_NOTE_FORM_STATE}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
}

export default NoteControlBar;

const SEARCH_PLACEHOLDER_TEXT = 'Search by title...';

const StyledNoteControlBar = styled.div`
  padding: 20px 40px 0;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr auto auto;
  grid-template-areas: 'title filters new-button';

  & > ${BorderButton} {
    gap: 5px;
  }

  @media ${({ theme }) => theme.devices.laptop} {
    grid-template-areas: 'title new-button' 'filters filters';
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px 20px 0;
  }
`;

const StyledSearch = styled(Search)`
  grid-area: title;
`;

const StyledFilters = styled.div`
  grid-area: filters;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media ${({ theme }) => theme.devices.laptop} {
    justify-content: flex-end;
  }
`;

const StyledNewButton = styled(BorderButton)`
  grid-area: new-button;
`;
