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
      <StyledControlBar>
        <div>
          <GroupButtons />
        </div>
        <StyledControlBarRight>
          {showAddSampleBtn && <AddSampleData />}
          <Backup />
        </StyledControlBarRight>
      </StyledControlBar>
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
`;

const StyledControlBar = styled('div')`
  display: flex;
  justify-content: space-between;

  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    gap: 10px;
  }
`;

const StyledControlBarRight = styled('div')`
  display: flex;
  gap: 10px;
`;
