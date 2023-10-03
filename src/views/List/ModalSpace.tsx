import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectStockModals } from '../../features/stockModal/stockModalSlice';

import AddGroupModal from './GroupButtons/AddGroupModal';
import DeleteGroupModal from './GroupButtons/DeleteGroupModal';
import DeleteGroupWarning from './GroupButtons/DeleteGroupWarning';
import ResetDataWarning from './Backup/ResetDataWarning';

type Modal = {
  modalName: string;
  Component: () => JSX.Element;
};

const ModalSpace = () => {
  const stockModal = useSelector(selectStockModals);
  return (
    <StyledModalSpace className='modal-space'>
      {MODALS.map(
        ({ modalName, Component }) =>
          stockModal?.[modalName]?.isOpen && <Component key={modalName} />,
      )}
    </StyledModalSpace>
  );
};

export default ModalSpace;

const MODALS: Modal[] = [
  { modalName: 'AddGroupModal', Component: AddGroupModal },
  { modalName: 'DeleteGroupModal', Component: DeleteGroupModal },
  { modalName: 'DeleteGroupWarning', Component: DeleteGroupWarning },
  { modalName: 'ResetDataWarning', Component: ResetDataWarning },
];

const StyledModalSpace = styled('div')`
  position: relative;
  z-index: 9999;
`;
