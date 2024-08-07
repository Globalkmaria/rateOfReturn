import { useState } from 'react';
import styled from 'styled-components';

import { BorderButton } from '@/components/Button';
import Icon from '@/components/Icon';
import RadioSelect from '@/components/RadioSelect';

import AddNote from './AddNote';
import useModal from '../List/hooks/useModal';

function NoteControlBar() {
  const { showModal, onOpenModal, onCloseModal, onToggleModal } = useModal();

  return (
    <>
      <StyledNoteControlBar>
        <RadioSelect
          size='s'
          title='Select order'
          label='Sort'
          value={'Sort'}
          options={[]}
          onClick={() => {}}
        >
          Sort
        </RadioSelect>
        <BorderButton size='s' onClick={onOpenModal}>
          <Icon icon='add' />
          <span>Add New</span>
        </BorderButton>
      </StyledNoteControlBar>
      {showModal && <AddNote onCloseModal={onCloseModal} />}
    </>
  );
}

export default NoteControlBar;

const StyledNoteControlBar = styled.div`
  padding: 20px 20px 0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  & > ${BorderButton} {
    gap: 5px;
  }
`;
