import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  selectGroupStockInfo,
  selectGroups,
  selectGroupsIds,
} from '@/features/groups/selectors';
import { getOptions } from '../../List/GroupButtons/utils';
import Description from './PortfolioAllocationDescription';
import { DoughnutSkeleton } from '../ChartSkeleton';
import NoStockMessage from '../NoStockMessage';
import PortfolioAllocationTable from './PortfolioAllocationTable';
import { getStockAllocationInfo } from './utils';
import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { validateGroupId } from '@/utils/group';
import ChartErrorPage from './ChartErrorPage';
import RadioSelect from '@/components/RadioSelect';

const PortfolioAllocationChart = lazy(
  () => import('./PortfolioAllocationChart'),
);

const PortfolioAllocation = () => {
  const navigate = useNavigate();
  const { groupId = MAIN_GROUP_ID } = useParams();

  const stockInfo = useSelector(selectGroupStockInfo(groupId));
  const groups = useSelector(selectGroups);
  const options = getOptions(groups);

  const groupIds = useSelector(selectGroupsIds);
  const isValidGroupId = validateGroupId(groupId, groupIds);
  if (!isValidGroupId)
    return (
      <ChartErrorPage
        defaultUrl={'/chart/portfolio-allocation'}
        title='group id'
        id={groupId}
        buttonName='Go to main group'
      />
    );

  const noData = stockInfo.allIds.length === 0;
  const stockAllocationInfo = getStockAllocationInfo(stockInfo);

  const onClick = (value: string) => navigate(`groups/${value}`);

  return (
    <StyledPortfolioAllocation>
      <RadioSelect
        onClick={onClick}
        options={options}
        value={groupId}
        size='m'
        title='Switch groups'
      />
      <Description />
      {noData ? (
        <NoStockMessage />
      ) : (
        <Suspense fallback={<DoughnutSkeleton />}>
          <PortfolioAllocationChart stockAllocationInfo={stockAllocationInfo} />
          <PortfolioAllocationTable stockAllocationInfo={stockAllocationInfo} />
        </Suspense>
      )}
    </StyledPortfolioAllocation>
  );
};

export default PortfolioAllocation;

const StyledPortfolioAllocation = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
