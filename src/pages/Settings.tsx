import { StyledPage } from './style';
import SettingsView from '../views/Settings';

const SettingsPage = () => {
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
