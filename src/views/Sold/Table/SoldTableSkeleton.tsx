import styled from 'styled-components';

import { Skeleton } from '@/components/Skeleton';

function SoldTableSkeleton() {
  return <Container />;
}

export default SoldTableSkeleton;

const Container = styled(Skeleton)`
  width: 100%;
  height: 500px;
  border-radius: 5px;
`;
