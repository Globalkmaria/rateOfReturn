import { useEffect, useState } from 'react';

import styled from 'styled-components';

import Card from './Card/Card';
import { TopStock } from '../../repository/topStocks/type';
import topStocksService from '../../service/topStocks';

const Home = () => {
  const [stocks, setStocks] = useState<TopStock[]>([]);

  const getTopStocks = async () => {
    const stocks = await topStocksService.getTopStocks();
    setStocks(stocks);
  };

  useEffect(() => {
    getTopStocks();
  }, []);

  return (
    <StyledHome>
      {stocks.map(stock => (
        <Card key={stock.id} stock={stock} />
      ))}
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled('div')`
  padding: 40px;
  display: flex;
  gap: 50px;
  justify-content: space-around;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px;
  }
`;
