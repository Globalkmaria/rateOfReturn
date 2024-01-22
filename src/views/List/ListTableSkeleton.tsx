import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectStocks } from '../../features/stockList/selectors';
import { Skeleton } from '../../components/Skeleton';
import { getListTableSkeletonHeight } from './utils';

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
