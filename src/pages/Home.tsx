import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import HomeMenu from '@/views/Home/HomeMenu';

import { StyledPage } from './style';

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

const StyledChart = styled(StyledPage)`
  display: flex;
  flex-direction: column;
`;
