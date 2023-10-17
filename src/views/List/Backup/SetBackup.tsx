import React, { useState } from 'react';
import styled from 'styled-components';

import { RootState } from '../../../store';
import { ContainedButton } from '../../../components/Button';
import SetBackupWarning from './SetBackupWarning';
import useModal from '../hooks/useModal';
import RemoteData from './RemoteData';

const SetBackup = () => {
  const [data, setData] = useState<RootState | null>(null);
  const { showModal, onOpenModal, onCloseModal } = useModal();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (event) => {
        try {
          setData(JSON.parse(event.target?.result as string) as RootState);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.onerror = (event) => {
        console.error('Error reading JSON file:', event.target?.error);
      };
    }
  };

  const onLocalOpen = () => {
    if (data === null || data === undefined) {
      alert('Please select a file.');
      return;
    }

    onOpenModal();
  };

  return (
    <StyledSetBackup>
      <input
        multiple={false}
        className='input-file'
        type='file'
        accept='.json'
        onChange={handleFileChange}
      />
      <ContainedButton color='secondary1' fullWidth onClick={onLocalOpen}>
        Set Backup
      </ContainedButton>
      {showModal && <SetBackupWarning onClose={onCloseModal} data={data} />}
      <RemoteData data={data} />
    </StyledSetBackup>
  );
};

export default SetBackup;

const StyledSetBackup = styled('div')`
  .input-file {
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid ${({ theme }) => theme.colors.grey600};
    border-radius: 5px;
    padding: 5px;
  }
  .store-remote-data {
    margin-top: 10px;
  }
`;
