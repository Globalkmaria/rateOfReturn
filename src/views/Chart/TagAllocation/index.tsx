import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import { validateGroupId } from '@/utils/group';

import { MAIN_GROUP_ID } from '@/features/groups/mockData';
import {
  selectGroupStockInfo,
  selectGroups,
  selectGroupsIds,
} from '@/features/groups/selectors';

import RadioSelect from '@/components/RadioSelect';

import Description from './TagAllocationDescription';
import { getOptions } from '../../List/GroupButtons/utils';
import { DoughnutSkeleton } from '../ChartSkeleton';
import NoStockMessage from '../NoStockMessage';
import TagTable from './TagTable';
import { getTagsInfo } from './utils';
import ChartErrorPage from '../PortfolioAllocation/ChartErrorPage';

const Chart = lazy(() => import('./TagAllocationChart'));

const TagAllocation = () => {
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
        defaultUrl={'/chart/tag-allocation'}
        title='group id'
        id={groupId}
        buttonName='Go to main group'
      />
    );

  const tagsInfo = getTagsInfo(stockInfo);
  const noData = stockInfo.allIds.length === 0;

  const onClick = (value: string) => navigate(`groups/${value}`);

  return (
    <StyledTagAllocation>
      <RadioSelect
        onClick={onClick}
        options={options}
        value={groupId}
        size='m'
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
