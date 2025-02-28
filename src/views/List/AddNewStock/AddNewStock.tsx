import { memo } from 'react';
import { useSelector } from 'react-redux';

import { selectIsStockListEditMode } from '@/features/temporalStockList/selectors';

import { useAddNewStock } from './hooks/useAddNewStock';
import { ContainedButton } from '../../../components/Button';

const AddNewStock = () => {
  const isEditMode = useSelector(selectIsStockListEditMode);
  const { onAddNewStock } = useAddNewStock();

  const disabled = isEditMode;
  return (
    <ContainedButton
      disabled={disabled}
      mode='light'
      onClick={onAddNewStock}
      color='secondary2'
      title='Add new stock'
    >
      Add new stock
    </ContainedButton>
  );
};

export default memo(AddNewStock);
