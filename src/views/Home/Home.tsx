import styled from 'styled-components/macro';
import Card from './Card/Card';
import stocksService from '../../service/stocks';
import { useEffect, useState } from 'react';
import { Stock } from '../../repository/type';

const Home = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const getStocks = async () => {
    const stocks = await stocksService.getStocks();
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
