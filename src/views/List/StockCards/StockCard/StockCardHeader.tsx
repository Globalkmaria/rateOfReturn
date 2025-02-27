import styled from 'styled-components';

import {
  StockCardColumnStyled,
  StockCardLabelStyled,
  StockCardRowStyled,
  StockCardValueStyled,
} from '.';

function StockCardHeader() {
  return (
    <StockCardHeaderStyled>
      <StockCardRowStyled>
        <StockCardColumnStyled grow={3}>
          <StockCardLabelStyled>Stock Name</StockCardLabelStyled>
          <StockCardValueStyled>SPDR S&P 500</StockCardValueStyled>
        </StockCardColumnStyled>
        <StockCardColumnStyled grow={2}>
          <StockCardLabelStyled>Tag</StockCardLabelStyled>
          <StockCardValueStyled>stock etf</StockCardValueStyled>
        </StockCardColumnStyled>
        <StockCardColumnStyled grow={5}>
          <StockCardLabelStyled>Current Price per Share</StockCardLabelStyled>
          <StockCardValueStyled>5,200,003.3000</StockCardValueStyled>
        </StockCardColumnStyled>
      </StockCardRowStyled>
      <StockCardRowStyled>
        <StockCardColumnStyled grow={3}>
          <StockCardLabelStyled>Quantity Bought</StockCardLabelStyled>
          <StockCardValueStyled>1,000,000</StockCardValueStyled>
        </StockCardColumnStyled>
        <StockCardColumnStyled grow={4}>
          <StockCardLabelStyled>Buy Price</StockCardLabelStyled>
          <StockCardValueStyled>5,200,003.3000</StockCardValueStyled>
        </StockCardColumnStyled>
        <StockCardColumnStyled grow={4}>
          <StockCardLabelStyled>Total Investment</StockCardLabelStyled>
          <StockCardValueStyled>5,200,003,999,999.3000</StockCardValueStyled>
        </StockCardColumnStyled>
      </StockCardRowStyled>
      <StockCardRowStyled>
        <StockCardColumnStyled grow={4}>
          <StockCardLabelStyled>Total Current Value</StockCardLabelStyled>
          <StockCardValueStyled>5,200,003,999,999.3000</StockCardValueStyled>
        </StockCardColumnStyled>
        <StockCardColumnStyled grow={4}>
          <StockCardLabelStyled>Profit/Loss</StockCardLabelStyled>
          <StockCardValueStyled>5,200,003,999,999.3000</StockCardValueStyled>
        </StockCardColumnStyled>
        <StockCardColumnStyled grow={2}>
          <StockCardLabelStyled>{`ROI (%)`}</StockCardLabelStyled>
          <StockCardValueStyled>1,000,000.12234</StockCardValueStyled>
        </StockCardColumnStyled>
      </StockCardRowStyled>
    </StockCardHeaderStyled>
  );
}

export default StockCardHeader;

const StockCardHeaderStyled = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey400};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 20px;
  flex-wrap: wrap;
`;
