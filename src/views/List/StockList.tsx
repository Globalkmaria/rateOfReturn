import styled from 'styled-components/macro';
import { BaseInput } from '../../components/Input';

import GroupButtons from './GroupButtons/GroupButtons';
import GroupSummary from './GroupSummary/GroupSummary';
import Backup from './Backup/Backup';
import StockTable from './StockTable';
import useGetUserData from './hooks/useGetUserData';

const StockList = () => {
  const { loading } = useGetUserData();

  if (loading) return <></>;
  return (
    <StyledStockList>
      <div className='control-bar'>
        <div className='control-bar__left'>
          <GroupButtons />
        </div>
        <div className='control-bar__right'>
          <Backup />
        </div>
      </div>
      <GroupSummary />
      <StockTable />
      <div className='container'></div>
    </StyledStockList>
  );
};

export default StockList;

const StyledStockList = styled('div')`
  ${BaseInput} {
    background: ${({ theme }) => theme.colors.grey300};

    &:disabled {
      background: none;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.grey900};
      opacity: 1;
    }
  }

  .control-bar {
    display: flex;
    justify-content: space-between;
  }
`;
