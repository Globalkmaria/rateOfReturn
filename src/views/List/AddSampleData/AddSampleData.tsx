import { BorderButton } from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLoggedIn } from '../../../features/user/selectors';
import userDataService from '../../../service/userData/userData';
import { addSampleData } from '../../../features/actions';

const AddSampleData = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onClick = async () => {
    if (isLoggedIn) {
      const result = await userDataService.addSampleUserData();
      if (!result.success) return;
    }

    dispatch(addSampleData());
  };

  return (
    <BorderButton onClick={onClick} size='m'>
      Add Sample Data
    </BorderButton>
  );
};

export default AddSampleData;
