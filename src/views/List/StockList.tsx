import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import GroupButtons from './GroupButtons/GroupButtons';
import GroupSummary from './GroupSummary/GroupSummary';
import Backup from './Backup/Backup';
import StockTable from './StockTable';
import AddSampleData from './AddSampleData/AddSampleData';
import { useShowAddSampleBtn } from './AddSampleData/useShowAddSampleBtn';
import { BaseInput } from '../../components/Input/BaseInput';
import useSaveChangedStocksData from './hooks/useSaveChangedStocksData';
import useSaveChangedGroupsData from './hooks/useSaveChangedGroupedData';

const StockList = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [showAddSampleBtn] = useShowAddSampleBtn();
  useSaveChangedGroupsData(firstLoad);
  useSaveChangedStocksData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <StyledStockList>
      <div className='control-bar'>
        <div className='control-bar__left'>
          <GroupButtons />
        </div>
        <div className='control-bar__right'>
          {showAddSampleBtn && <AddSampleData />}
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

  .control-bar__right {
    display: flex;
    gap: 10px;
  }

  @media ${({ theme }) => theme.devices.tablet} {
    .control-bar {
      flex-direction: column;
      gap: 10px;
    }
  }
`;
