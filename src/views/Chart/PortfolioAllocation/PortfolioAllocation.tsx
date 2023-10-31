import { Suspense, lazy, useState } from 'react';
import styled from 'styled-components';
import Select from '../../../components/Select';
import { useSelector } from 'react-redux';
import { selectGroups } from '../../../features/groups/selectors';
import { getOptions } from '../../List/GroupButtons/utils';
import Description from './PortfolioAllocationDescription';
import CartSkeleton from './CartSkeleton';

const Chart = lazy(() => import('./PortfolioAllocationChart'));

const PortfolioAllocation = () => {
  const [groupId, setGroupId] = useState<string>('1');
  const groups = useSelector(selectGroups);
  const options = getOptions(groups);
  return (
    <StyledPortfolioAllocation>
      <Select
        className='select-group'
        onChange={(e) => setGroupId(e.target.value)}
        width={140}
        initialValue='1'
        options={options}
        value={groupId}
        title='Choose group to show'
      />
      <Description />
      <Suspense fallback={<CartSkeleton />}>
        <Chart groupId={groupId} />
      </Suspense>
    </StyledPortfolioAllocation>
  );
};

export default PortfolioAllocation;

const StyledPortfolioAllocation = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  .select-group {
    margin-bottom: 10px;
  }
`;
