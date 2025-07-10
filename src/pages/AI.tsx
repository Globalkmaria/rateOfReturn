import styled from 'styled-components';

import StockAI from '@/views/AI';

import { StyledPage } from './style';

function AIPage() {
  return (
    <StyledChart>
      <StockAI />
    </StyledChart>
  );
}

export default AIPage;

const StyledChart = styled(StyledPage)`
  display: flex;
  flex-direction: column;
`;
