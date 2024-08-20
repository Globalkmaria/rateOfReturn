import styled from 'styled-components';

import Modal from '../../components/Modal/Modal';
import { ContainedButton } from '../../components/Button';
import userDataService from '../../service/userData/userData';
import useGetUserData from '../List/hooks/useGetUserData';
import { getLocalState } from './utils';
import { useState } from 'react';
import { setLocalStorageItem } from '@/utils/getLocalStorage';

type Props = {
  onClose: () => void;
};

const MergeLocalDataModal = ({ onClose }: Props) => {
  const { getUserData } = useGetUserData();
  const localState = getLocalState();
  const [loading, setLoading] = useState(false);

  const mergeButtonLabel = loading ? 'Merging...' : 'Merge Data';

  const onMerge = async () => {
    if (loading) return;

    setLoading(true);
    const result = await userDataService.mergeUserData(localState);

    if (!result.success) {
      setLoading(false);
      return;
    }

    getUserData();
    localStorage.clear();
    setLocalStorageItem('merge', true);

    setLoading(false);
    onClose();
  };

  const onDismiss = () => {
    localStorage.clear();
    setLocalStorageItem('merge', true);

    onClose();
  };

  const onModalClose = () => {
    if (loading) return;
    onClose();
  };

  return (
    <Modal title='Data Sync' onClose={onModalClose}>
      <div>
        <StyledMessage>
          You have local data that is not synced with the server. Would you like
          to merge it with the server data?
        </StyledMessage>
        <StyledButtonGroup>
          <ContainedButton
            disabled={loading}
            color='secondary1'
            size='m'
            onClick={onMerge}
          >
            {mergeButtonLabel}
          </ContainedButton>
          <ContainedButton disabled={loading} size='m' onClick={onDismiss}>
            Dismiss
          </ContainedButton>
        </StyledButtonGroup>
      </div>
    </Modal>
  );
};

export default MergeLocalDataModal;

const StyledMessage = styled('p')`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.7;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 50vw;
    min-width: 200px;
  }
`;

const StyledButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
