import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DeleteStockModal } from '../views/List/StockItem/DeleteStockModal';
import { selectStockModals } from '../features/stockModal/stockModalSlice';
import BackupModal from '../views/List/Backup/BackupModal';
import SetBackupWarning from '../views/List/Backup/SetBackupWarning';
import AddGroupModal from '../views/List/GroupButtons/AddGroupModal';
import DeleteGroupModal from '../views/List/GroupButtons/DeleteGroupModal';

type Modal = {
  modalName: string;
  Component: () => JSX.Element;
};

const MODALS: Modal[] = [
  { modalName: 'DeleteStockModal', Component: DeleteStockModal },
  { modalName: 'BackupModal', Component: BackupModal },
  { modalName: 'SetBackupWarning', Component: SetBackupWarning },
  { modalName: 'AddGroupModal', Component: AddGroupModal },
  { modalName: 'DeleteGroupModal', Component: DeleteGroupModal },
];

const ModalSpace = () => {
  const stockModal = useSelector(selectStockModals);
  return (
    <StyledModalSpace className='modal-space'>
      {MODALS.map(
        ({ modalName, Component }, i) =>
          stockModal?.[modalName]?.isOpen && <Component key={modalName} />,
      )}
    </StyledModalSpace>
  );
};

export default ModalSpace;

const StyledModalSpace = styled('div')`
  position: relative;
`;
