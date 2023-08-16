import styled from 'styled-components/macro';
import Card from './Card/Card';
import topStocksService from '../../service/topStocks';
import { useEffect, useState } from 'react';
import { TopStock } from '../../repository/topStocks/type';

const Home = () => {
  const [stocks, setStocks] = useState<TopStock[]>([]);
  const getStocks = async () => {
    const stocks = await topStocksService.getTopStocks();
    setStocks(stocks);
  };

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <StyledHome>
      {stocks.map((stock) => (
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
`;
