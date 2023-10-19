import { BorderButton } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addSampleGroups } from '../../../features/groups/groupsSlice';
import { addSampleStockList } from '../../../features/stockList/stockListSlice';
import { addSampleCheckedItems } from '../../../features/checkedItems/checkedItemsSlice';
import { selectIsLoggedIn } from '../../../features/user/selectors';
import userDataService from '../../../service/userData/userData';

const AddSampleData = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onClick = async () => {
    if (isLoggedIn) {
      const result = await userDataService.addSampleUserData();
      if (!result.success) return;
    }

    dispatch(addSampleStockList());
    dispatch(addSampleCheckedItems());
    dispatch(addSampleGroups());
  };

  return (
    <BorderButton onClick={onClick} size='m'>
      Add Sample Data
    </BorderButton>
  );
};

export default AddSampleData;
