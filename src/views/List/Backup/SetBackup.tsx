import React, { useState } from 'react';
import styled from 'styled-components';

import { RootState } from '../../../store';
import { ContainedButton } from '../../../components/Button';
import useModal from '../hooks/useModal';
import StoreRemoteBackupWarning from './StoreRemoteBackupWarning';

const SetBackup = () => {
  const [data, setData] = useState<RootState | null>(null);
  const { showModal, onOpenModal, onCloseModal } = useModal();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = event => {
        try {
          setData(JSON.parse(event.target?.result as string) as RootState);
        } catch (error) {
          console.error('Error parsing JSON file:', error);
        }
      };
      reader.onerror = event => {
        console.error('Error reading JSON file:', event.target?.error);
      };
    }
  };

  const onClick = () => {
    if (data === null || data === undefined) {
      alert('Please select a file.');
      return;
    }

    onOpenModal();
  };

  return (
    <div>
      <StyledInputFile
        multiple={false}
        type='file'
        accept='.json'
        onChange={handleFileChange}
      />
      <ContainedButton color='warning' fullWidth onClick={onClick}>
        Restore from Backup
      </ContainedButton>
      {showModal && (
        <StoreRemoteBackupWarning onClose={onCloseModal} data={data} />
      )}
    </div>
  );
};

export default SetBackup;

const StyledInputFile = styled.input`
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.grey600};
  border-radius: 5px;
  padding: 5px;
`;
