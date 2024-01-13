import styled from 'styled-components';

const PortfolioAllocationDescription = () => {
  return (
    <StyledPortfolioAllocationDescription>
      <div>
        <StyledTitle>Inner Circle : </StyledTitle>
        <span>
          Percentage Allocation of Stock in Portfolio (Buy Price)
          <br /> formula: (Stock total buy price / Portfolio total buy price) * 100
        </span>
      </div>
      <div>
        <StyledTitle>Outer Circle : </StyledTitle>
        <span>
          Percentage Allocation of Stock in Portfolio (Current Price)
          <br /> formula: (Stock total current price / Portfolio total current price) * 100
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
`;

const StyledTitle = styled.span`
  font-weight: 700;
`;
