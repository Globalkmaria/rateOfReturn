import styled from 'styled-components';

import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';
import Search from '@/components/Search';
import RadioSelect from '@/components/RadioSelect';
import { mockFn } from '@/utils/mock';

import useModal from '../List/hooks/useModal';
import AddNote from './NoteInfo/modals/AddNote';
import { INITIAL_NOTE_FORM_STATE } from './NoteInfo/const';

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
          <RadioSelect
            label='Stock name'
            title='Filter by stock name'
            value={''}
            options={[]}
            onClick={mockFn}
          />
          <RadioSelect
            label='Stock Id'
            title='Filter by stock id'
            value={''}
            options={[]}
            onClick={mockFn}
          />
          <RadioSelect
            label='Sold Id'
            title='Filter by sold id'
            value={''}
            options={[]}
            onClick={mockFn}
          />
          <RadioSelect
            label='Tag'
            title='Filter by tag'
            value={''}
            options={[]}
            onClick={mockFn}
          />
          <RadioSelect
            label='Sort'
            title='Sort by'
            value={''}
            options={[
              { value: 'createdAt', label: 'created at ascending' },
              { value: 'updatedAt', label: 'Newest' },
            ]}
            onClick={mockFn}
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
