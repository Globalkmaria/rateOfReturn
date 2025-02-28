import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { getListTableSkeletonHeight } from './utils';
import { Skeleton } from '../../components/Skeleton';
import { selectStocks } from '../../features/stockList/selectors';

function ListTableSkeleton() {
  const stocks = useSelector(selectStocks);
  const height = getListTableSkeletonHeight(stocks);
  return <StyledTableSkeleton height={height} />;
}

export default ListTableSkeleton;

const StyledTableSkeleton = styled(Skeleton)<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  border-radius: 5px;
`;
