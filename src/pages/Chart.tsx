import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import { StyledPage } from './style';
import ChartMenu from '../views/Chart/ChartMenu';

const Chart = () => {
  return (
    <>
      <title>Insightful Charts to Understand Your Stocks Better | ROR</title>
      <StyledChart>
        <ChartMenu />
        <Outlet />
      </StyledChart>
    </>
  );
};

export default Chart;

const StyledChart = styled(StyledPage)`
  display: flex;
  flex-direction: column;
`;
