import styled from 'styled-components';

const PortfolioAllocationDescription = () => {
  return (
    <StyledPortfolioAllocationDescription>
      <div>
        <p>
          <StyledTitle>Inner Circle : </StyledTitle>
          Portfolio stock allocation by
          <StyledTitle> buy price</StyledTitle>
        </p>
        <StyledSubText>
          Formula: (Stock total buy price / Portfolio total buy price) * 100
        </StyledSubText>
      </div>
      <div>
        <p>
          <StyledTitle>Outer Circle : </StyledTitle>
          Portfolio stock allocation by
          <StyledTitle> current price</StyledTitle>
        </p>
        <StyledSubText>
          Formula: (Stock total current price / Portfolio total current price) *
          100
        </StyledSubText>
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

const StyledSubText = styled('p')`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey600};
`;
