import { useEffect, useState } from 'react';
import styled from 'styled-components';

import StockList from '../views/List/StockList';
import useSaveChangedGroupsData from '@/views/List/hooks/useSaveChangedGroupedData';
import useSaveChangedStocksData from '@/views/List/hooks/useSaveChangedStocksData';
import useSaveChangedSoldsData from '@/views/List/hooks/useSaveChangedSoldData';
import useSaveChangedNotesData from '@/views/Note/hooks/useSaveChangedNotesData';

const List = () => {
  const [firstLoad, setFirstLoad] = useState(true);

  useSaveChangedGroupsData(firstLoad);
  useSaveChangedStocksData(firstLoad);
  useSaveChangedSoldsData(firstLoad);
  useSaveChangedNotesData(firstLoad);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  return (
    <>
      <title>
        Investment Portfolio Tracker | Manage Your Stocks and Bonds Efficiently
        | ROR
      </title>
      <StyledList>
        <StockList />
      </StyledList>
    </>
  );
};

export default List;

const StyledList = styled('div')`
  padding: 0 40px 20px 40px;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0 20px 20px 20px;
  }
`;
