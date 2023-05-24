import React, { useState } from 'react';
import styled from 'styled-components';
import { RootState } from '../../../store';
import { useDispatch } from 'react-redux';
import { setBackupCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { setBackupGroups } from '../../../features/groups/groupsSlice';
import { setBackupStockList } from '../../../features/stockList/stockListSlice';
import { initialStockModal } from '../../../features/stockModal/stockModalSlice';
import { ContainedButton } from '../../../components/Button';
import Modal from '../../../components/Modal';

const SetBackup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<RootState | null>(null);
  const dispatch = useDispatch();
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

  const backupData = () => {
    if (data === null || data === undefined) return;
    dispatch(setBackupCheckedItems(data.checkedItems));
    dispatch(setBackupGroups(data.groups));
    dispatch(setBackupStockList(data.stockList));
    dispatch(initialStockModal());
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
      <ContainedButton
        color='secondary1'
        fullWidth
        onClick={() => setIsOpen(true)}
      >
        Set Backup
      </ContainedButton>
      <Modal title='Warning' isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className='modal-content'>
          <p className='text'>
            If you set backup, all data will be deleted.
            <br /> Are you sure you want to set backup?
          </p>
          <ContainedButton
            className='set-btn'
            color='warning'
            onClick={backupData}
            fullWidth
          >
            Set Backup
          </ContainedButton>
        </div>
      </Modal>
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

  .modal-content {
    display: flex;
    flex-direction: column;
    width: 340px;
    height: 145px;
    text-align: center;
    font-weight: 700;

    .text {
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1.7;
      flex: 1;
    }
  }
`;
