import { BorderButton } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../../features/user/selectors';
import userDataService from '../../../service/userData/userData';
import { addStockSampleData } from '@/features';
import { useShowAddSampleBtn } from './useShowAddSampleBtn';

const AddSampleData = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const showAddSampleBtn = useShowAddSampleBtn();
  if (!showAddSampleBtn) return null;

  const onClick = async () => {
    if (isLoggedIn) {
      const result = await userDataService.addStockAndGroupSample();
      if (!result.success) return;
    }

    dispatch(addStockSampleData());
  };

  return (
    <BorderButton onClick={onClick} size='m'>
      Add Sample Data
    </BorderButton>
  );
};

export default AddSampleData;
