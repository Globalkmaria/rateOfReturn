import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

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
