import React from 'react';
import styled from 'styled-components';
import { saveAs } from 'file-saver';
import { ContainedButton } from '../../../components/Button';
import { store } from '../../../store';
import { getCurrentDateTimeString } from './utils';

const SaveAsFile = () => {
  const handleSave = () => {
    const data = store.getState();
    const blob = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });
    const date = getCurrentDateTimeString();
    saveAs(blob, `RoR${date}.json`);
  };

  return (
    <StyledSaveAsFile>
      <ContainedButton onClick={handleSave} title='Save File Button' fullWidth>
        Get Backup File
      </ContainedButton>
    </StyledSaveAsFile>
  );
};

export default SaveAsFile;

const StyledSaveAsFile = styled('div')`
  margin-top: 5px;
`;
