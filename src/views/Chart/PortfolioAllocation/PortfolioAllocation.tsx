import { Suspense, lazy, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Select from '../../../components/Select';
import {
  selectGroupStockInfo,
  selectGroups,
} from '../../../features/groups/selectors';
import { getOptions } from '../../List/GroupButtons/utils';
import Description from './PortfolioAllocationDescription';
import { BorderAnchor } from '@/components/Anchor';
import { DoughnutSkeleton } from '../ChartSkeleton';

const PortfolioAllocationChart = lazy(
  () => import('./PortfolioAllocationChart'),
);

const PortfolioAllocation = () => {
  const [groupId, setGroupId] = useState<string>('1');
  const stockInfo = useSelector(selectGroupStockInfo(groupId));
  const groups = useSelector(selectGroups);
  const options = getOptions(groups);

  const noData = stockInfo.allIds.length === 0;

  return (
    <StyledPortfolioAllocation>
      <StyledSelect
        onChange={e => setGroupId(e.target.value)}
        width={140}
        initialValue='1'
        options={options}
        value={groupId}
        title='Choose group to show'
      />
      <Description />
      {noData ? (
        <StyledNoStock>
          Please add stocks in
          <BorderAnchor to='/portfolio'>Current Portfolio</BorderAnchor>
          to see this chart.
        </StyledNoStock>
      ) : (
        <Suspense fallback={<DoughnutSkeleton />}>
          <PortfolioAllocationChart groupId={groupId} />
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
