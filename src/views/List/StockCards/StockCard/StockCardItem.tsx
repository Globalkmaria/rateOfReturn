import styled from 'styled-components';

import {
  StockCardColumnStyled,
  StockCardLabelStyled,
  StockCardRowStyled,
  StockCardValueStyled,
} from '.';

function StockCardItem() {
  return (
    <StockCardItemStyled>
      <StockCardRowStyled>
        <StockCardColumnStyled grow={2}>
          <StockCardLabelStyled>#</StockCardLabelStyled>
          <StockCardValueStyled>1000</StockCardValueStyled>
        </StockCardColumnStyled>
        <StockCardColumnStyled grow={8}>
          <StockCardLabelStyled>Buy Date</StockCardLabelStyled>
          <div>
            <StockCardValueStyled>
              <span>2021-01-01</span>
              <span>11:30 PM</span>
            </StockCardValueStyled>
          </div>
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
    </StockCardItemStyled>
  );
}

export default StockCardItem;

const StockCardItemStyled = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  border-radius: 8px;
  flex-wrap: wrap;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
