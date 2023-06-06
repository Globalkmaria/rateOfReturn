import React from 'react';
import styled from 'styled-components';

const PortfolioAllocationDescription = () => {
  return (
    <StyledPortfolioAllocationDescription>
      <div className='info'>
        <span className='title'>Inner Circle : </span>
        <span className='content'>
          Percentage Allocation of Stock in Portfolio (Buy Price)
          <br /> formula: (Stock total buy price / Portfolio total buy price) *
          100
        </span>
      </div>
      <div className='info'>
        <span className='title'>Outer Circle : </span>
        <span className='content'>
          Percentage Allocation of Stock in Portfolio (Current Price)
          <br /> formula: (Stock total current price / Portfolio total current
          price) * 100
        </span>
      </div>
    </StyledPortfolioAllocationDescription>
  );
};

export default PortfolioAllocationDescription;

const StyledPortfolioAllocationDescription = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .title {
    font-weight: 700;
  }
`;
