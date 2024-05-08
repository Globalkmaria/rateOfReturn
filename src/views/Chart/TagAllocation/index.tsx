import { Suspense, lazy, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Select from '../../../components/Select';
import {
  selectGroupStockInfo,
  selectGroups,
} from '../../../features/groups/selectors';
import { getOptions } from '../../List/GroupButtons/utils';
import Description from './TagAllocationDescription';
import { DoughnutSkeleton } from '../ChartSkeleton';
import NoStockMessage from '../NoStockMessage';
import TagTable from './TagTable';
import { getTagsInfo } from './utils';

const Chart = lazy(() => import('./TagAllocationChart'));

const TagAllocation = () => {
  const [groupId, setGroupId] = useState<string>('1');
  const stockInfo = useSelector(selectGroupStockInfo(groupId));
  const groups = useSelector(selectGroups);
  const options = getOptions(groups);

  const tagsInfo = getTagsInfo(stockInfo);
  const noData = stockInfo.allIds.length === 0;

  return (
    <StyledTagAllocation>
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
        <NoStockMessage />
      ) : (
        <Suspense fallback={<DoughnutSkeleton />}>
          <Chart tagsInfo={tagsInfo} />
          <TagTable tagsInfo={tagsInfo} />
        </Suspense>
      )}
    </StyledTagAllocation>
  );
};

export default TagAllocation;

const StyledTagAllocation = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const StyledSelect = styled(Select)`
  margin-bottom: 10px;
`;
