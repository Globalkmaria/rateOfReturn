import styled from 'styled-components';

import Modal from '../../components/Modal/Modal';
import { ContainedButton } from '../../components/Button';
import userDataService from '../../service/userData/userData';
import useGetUserData from '../List/hooks/useGetUserData';
import { getLocalStockAndGroup } from './utils';

type Props = {
  onClose: () => void;
};

const MergeLocalDataModal = ({ onClose }: Props) => {
  const { getUserData } = useGetUserData();

  const onMerge = async () => {
    const result = await userDataService.mergeUserData(getLocalStockAndGroup());

    if (!result.success) return;
    getUserData();
    localStorage.clear();

    onClose();
  };

  return (
    <Modal title='Data Sync' onClose={onClose}>
      <div>
        <StyledMessage>
          You have local data that is not synced with the server. Would you like to merge it with the server data?
        </StyledMessage>
        <StyledButtonGroup>
          <ContainedButton color='secondary1' size='m' onClick={onMerge}>
            Merge data
          </ContainedButton>
          <ContainedButton size='m' onClick={onClose}>
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
