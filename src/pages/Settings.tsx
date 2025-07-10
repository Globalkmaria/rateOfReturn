import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { StyledPage } from './style';
import { selectIsLoggedIn } from '../features/user/selectors';
import SettingsView from '../views/Settings';

const SettingsPage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <title>Account Settings | ROR</title>
      <StyledPage>
        <SettingsView />
      </StyledPage>
    </>
  );
};

export default SettingsPage;
