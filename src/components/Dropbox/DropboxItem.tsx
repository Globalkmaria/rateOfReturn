import styled from 'styled-components';

export const DropboxItem = styled.button.attrs({ type: 'button' })`
  &&:disabled {
    cursor: default;
    color: ${({ theme }) => theme.colors.grey400};
    background: transparent;
  }
`;
