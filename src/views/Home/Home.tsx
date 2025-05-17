import styled from 'styled-components';

import News from './News';
import TopStocks from './TopStocks';

const Home = () => {
  return (
    <StyledHome>
      <News />
      <TopStocks />
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled('div')`
  padding: 40px;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px;
  }
`;
