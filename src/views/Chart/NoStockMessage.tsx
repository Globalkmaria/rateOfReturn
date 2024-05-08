import styled from 'styled-components';

import { BorderAnchor } from '@/components/Anchor';

function NoStockMessage() {
  return (
    <StyledNoStock>
      Please add stocks in
      <BorderAnchor to='/portfolio'>Current Portfolio</BorderAnchor>
      to see this chart.
    </StyledNoStock>
  );
}

export default NoStockMessage;

const StyledNoStock = styled('p')`
  display: flex;
  align-items: center;
  margin: auto;

  ${BorderAnchor} {
    margin: 0 10px;
  }
`;
