import styled from 'styled-components/macro';

import Modal from '../../components/Modal/Modal';
import { ContainedButton } from '../../components/Button';
import userDataService from '../../service/userData/userData';
import formatStockAsServerFormat from '../../utils/formatStockAsServerFormat';
import formatGroupAsServerFormat from '../../utils/formatGroupAsServerFormat';
import useGetUserData from '../List/hooks/useGetUserData';

type Props = {
  onClose: () => void;
};

const MergeLocalDataModal = ({ onClose }: Props) => {
  const { getUserData } = useGetUserData();

  const onMerge = async () => {
    const localStocks = localStorage.getItem('stockList');
    const stocks = localStocks
      ? formatStockAsServerFormat(JSON.parse(localStocks))
      : null;
    const localGroups = localStorage.getItem('groups');
    const groups = localGroups
      ? formatGroupAsServerFormat(JSON.parse(localGroups))
      : null;

    const result = await userDataService.mergeUserData({
      stocks: stocks?.stocks || {},
      groups: groups?.groups || {},
    });

    if (!result.success) return;
    getUserData();
    localStorage.clear();

    onClose();
  };

  return (
    <Modal title='Data Sync' onClose={onClose}>
      <StyledMergeLocalDataModal>
        <p className='message'>
          You have local data that is not synced with the server. Would you like
          to merge it with the server data?
        </p>
        <div className='btns'>
          <ContainedButton color='secondary1' size='m' onClick={onMerge}>
            Merge data
          </ContainedButton>
          <ContainedButton size='m' onClick={onClose}>
            Dismiss
          </ContainedButton>
        </div>
      </StyledMergeLocalDataModal>
    </Modal>
  );
};

export default MergeLocalDataModal;

const StyledMergeLocalDataModal = styled('div')`
  .message {
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.7;
  }

  .btns {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  @media ${({ theme }) => theme.devices.mobile} {
    .message {
      width: 50vw;
      min-width: 200px;
    }
  }
`;
