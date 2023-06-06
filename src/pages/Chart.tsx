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

const StyledChart = styled('div')``;
