import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import HomeMenu from '@/views/Home/HomeMenu';

const Home = () => {
  return (
    <>
      <title>Stocks to Invest | ROR</title>
      <StyledChart>
        <HomeMenu />
        <Outlet />
      </StyledChart>
    </>
  );
};

export default Home;

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
