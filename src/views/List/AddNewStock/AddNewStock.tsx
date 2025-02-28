import { memo } from 'react';

import { useAddNewStock } from './hooks/useAddNewStock';
import { ContainedButton } from '../../../components/Button';

const AddNewStock = () => {
  const { onAddNewStock } = useAddNewStock();
  return (
    <ContainedButton
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
