import React, { useState } from 'react';
import styled from 'styled-components';
import Chart from './PortfolioAllocationChart';
import Select from '../../../components/Select';
import { useSelector } from 'react-redux';
import { selectGroups } from '../../../features/groups/selectors';
import { getOptions } from '../../List/GroupButtons/utils';
import Description from './PortfolioAllocationDescription';

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
      <Chart groupId={groupId} />
    </StyledPortfolioAllocation>
  );
};

export default PortfolioAllocation;

const StyledPortfolioAllocation = styled('div')`
  .select-group {
    margin-bottom: 10px;
  }
`;
