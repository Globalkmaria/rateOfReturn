import styled from 'styled-components';
import ChartMenu from '../views/Chart/ChartMenu';
import { Outlet } from 'react-router-dom';

const Chart = () => {
  return (
    <StyledChart>
      <ChartMenu />

      <Outlet />
    </StyledChart>
  );
};

export default Chart;

const StyledChart = styled('div')`
  min-height: calc(100vh - 141px);
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.devices.tablet} {
    min-height: calc(100vh - 200px);
  }
`;
