import styled from 'styled-components';

export const StyledField = styled.div`
  display: flex;
  align-items: center;

  .radio-select__button {
    border: none;

    &:hover {
      border: none;
    }
  }
`;

export const StyledName = styled.span`
  width: 150px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey600};
`;
