import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import authService from '@/service/auth';

import { selectIsLoggedIn } from '@/features/user/selectors';

import { ContainedButton } from '@/components/Button';
import WarningModal from '@/components/WarningModal';

import useModal from '../List/hooks/useModal';

const Settings = () => {
  const navigate = useNavigate();
  const { showModal, onOpenModal, onCloseModal } = useModal();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleDeleteAccount = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const result = await authService.deleteAccount();

    if (result) {
      navigate('/');
    } else {
      alert('Failed to delete account. Please try again later.');
    }

    onCloseModal();
  };

  return (
    <>
      <StyledContainer>
        <StyledHeader>
          <StyledTitle>Account Settings</StyledTitle>
          <StyledSubtitle>
            Manage your account preferences and data
          </StyledSubtitle>
        </StyledHeader>

        <StyledDangerZone>
          <StyledDangerTitle>Danger Zone</StyledDangerTitle>
          <StyledDangerDescription>
            Once you delete your account, there is no going back. Please be
            certain.
          </StyledDangerDescription>
          <ContainedButton size='s' color={'warning'} onClick={onOpenModal}>
            Delete Account
          </ContainedButton>
        </StyledDangerZone>
      </StyledContainer>

      {showModal && (
        <WarningModal
          message='Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.'
          onClose={onCloseModal}
          onConfirm={handleDeleteAccount}
          buttonName='Delete Account'
        />
      )}
    </>
  );
};

export default Settings;

const StyledContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const StyledHeader = styled.div`
  margin-bottom: 40px;
`;

const StyledTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  margin: 0 0 8px 0;
`;

const StyledSubtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0;
`;

const StyledDangerZone = styled.div`
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.red700};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
`;

const StyledDangerTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.red700};
  margin: 0 0 8px 0;
`;

const StyledDangerDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 0 0 16px 0;
  line-height: 1.5;
`;
