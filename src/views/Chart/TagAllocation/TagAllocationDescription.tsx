import styled from 'styled-components';

const TagAllocationDescription = () => {
  return (
    <StyledContainer>
      <div>
        <p>
          <StyledTitle>Inner Circle : </StyledTitle>
          Tag allocation by
          <StyledTitle> buy price</StyledTitle>
        </p>
        <StyledSubText>
          Formula: (Tag total buy price / Portfolio total buy price) * 100
        </StyledSubText>
      </div>
      <div>
        <p>
          <StyledTitle>Outer Circle : </StyledTitle>
          Tag allocation by
          <StyledTitle> current price</StyledTitle>
        </p>
        <StyledSubText>
          Formula: (Tag total current price / Portfolio total current price) *
          100
        </StyledSubText>
      </div>
    </StyledContainer>
  );
};

export default TagAllocationDescription;

const StyledContainer = styled('div')`
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
