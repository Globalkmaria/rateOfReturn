import { useEffect, useState } from 'react';

import styled from 'styled-components';

import topStocksService from '@/service/topStocks';

import { TopStock } from '@/repository/topStocks/type';

import Card from '../Card/Card';

function TopStocks() {
  const [stocks, setStocks] = useState<TopStock[]>([]);

  const getTopStocks = async () => {
    const stocks = await topStocksService.getTopStocks();
    setStocks(stocks);
  };

  useEffect(() => {
    getTopStocks();
  }, []);
  return (
    <StyledContainer>
      <StyledTitle>📈 Top Stocks</StyledTitle>
      <StyledCards>
        {stocks.map(stock => (
          <Card key={stock.id} stock={stock} />
        ))}
      </StyledCards>
    </StyledContainer>
  );
}

export default TopStocks;

const StyledContainer = styled('div')`
  margin-top: 20px;
`;

const StyledTitle = styled('h2')`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding: 20px;
  text-align: center;
`;

const StyledCards = styled('div')`
  padding: 40px;
  display: flex;
  gap: 50px;
  justify-content: space-around;
  flex-wrap: wrap;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px;
  }
`;
