import React from 'react';
import WarningModal from '../../../components/WarningModal';
import { useDispatch } from 'react-redux';
import { restStockList } from '../../../features/stockList/stockListSlice';
import {
  closeStockModal,
  resetStockModal,
} from '../../../features/stockModal/stockModalSlice';
import { resetGroups } from '../../../features/groups/groupsSlice';
import { resetCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';

const ResetDataWarning = () => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(closeStockModal('ResetDataWarning'));

  const onReset = () => {
    dispatch(resetCheckedItems());
    dispatch(restStockList());
    dispatch(resetStockModal());
    dispatch(resetGroups());
    onClose();
  };
  return (
    <WarningModal
      onClose={onClose}
      onConfirm={onReset}
      message={MESSAGE}
      buttonName='Reset'
    />
  );
};

export default ResetDataWarning;

const MESSAGE = (
  <>
    If you reset, current data will be deleted.
    <br /> Are you sure you want to reset?
  </>
);
