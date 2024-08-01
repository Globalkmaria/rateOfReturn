import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Select from '../../../components/Select';
import {
  selectGroupStockInfo,
  selectGroups,
  selectGroupsIds,
} from '@/features/groups/selectors';
import { getOptions } from '../../List/GroupButtons/utils';
import Description from './PortfolioAllocationDescription';
import { BorderAnchor } from '@/components/Anchor';
import { DoughnutSkeleton } from '../ChartSkeleton';
import NoStockMessage from '../NoStockMessage';
import PortfolioAllocationTable from './PortfolioAllocationTable';
import { getStockAllocationInfo } from './utils';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import { validateGroupId } from '@/utils/group';
import ChartErrorPage from './ChartErrorPage';

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

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    navigate(`groups/${e.target.value}`);
  };

  return (
    <StyledPortfolioAllocation>
      <StyledSelect
        onChange={onChange}
        width={140}
        initialValue={groupId}
        options={options}
        value={groupId}
        title='Choose group to show'
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

const StyledSelect = styled(Select)`
  margin-bottom: 10px;
`;

const StyledNoStock = styled('p')`
  display: flex;
  align-items: center;
  margin: auto;

  ${BorderAnchor} {
    margin: 0 10px;
  }
`;
