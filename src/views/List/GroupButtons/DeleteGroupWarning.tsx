import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeStockModal,
  selectModalProps,
} from '../../../features/stockModal/stockModalSlice';
import { deleteGroup } from '../../../features/groups/groupsSlice';
import DeleteWarningModal from '../../../components/DeleteWarningModal';

export type DeleteGroupWarningProps = {
  groupId: string;
};

const DeleteGroupWarning = () => {
  const dispatch = useDispatch();
  const { groupId } = useSelector(
    selectModalProps('DeleteGroupWarning'),
  ) as DeleteGroupWarningProps;

  const onClose = () => {
    dispatch(closeStockModal('DeleteGroupWarning'));
  };

  const onDelete = () => {
    dispatch(deleteGroup(groupId));
    onClose();
  };

  return (
    <DeleteWarningModal
      onClose={onClose}
      onDelete={onDelete}
      message={MESSAGE}
    />
  );
};

export default DeleteGroupWarning;

const MESSAGE = `Are you sure you want to delete this group?`;
