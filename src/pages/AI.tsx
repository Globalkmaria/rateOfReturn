import styled from 'styled-components';

import StockAI from '@/views/AI';

function AIPage() {
  return (
    <StyledChart>
      <StockAI />
    </StyledChart>
  );
}

export default AIPage;

const StyledChart = styled('div')`
  min-height: calc(100vh - 141px);
  padding: 20px 40px;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.devices.tablet} {
    min-height: calc(100vh - 200px);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px;
  }
`;
