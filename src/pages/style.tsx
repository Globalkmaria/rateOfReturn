import styled from 'styled-components';

export const StyledPage = styled('main')`
  min-height: calc(100vh - 141px);
  padding: 20px 40px;

  @media ${({ theme }) => theme.devices.laptop} {
    min-height: calc(100vh - 202px);
  }

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 20px;
  }
`;
